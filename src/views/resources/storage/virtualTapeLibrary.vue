<template>
  <!-- 虚拟带库页面 -->
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="queryParam">
        <a-row :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="设备名称">
              <a-input v-model="queryParam.name" placeholder="请输入设备名称" />
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
            <a-form-item label="序列号">
              <a-input v-model="queryParam.number" placeholder="请输入序列号" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="handlerQuery" type="primary">查询</a-button>
              <a-button @click="handlerReset" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-space>
        <a-button @click="() => visible = true" type="primary" icon="plus">新增</a-button>
        <a-button type="primary" icon="download" @click="handleExportXls('职务表')">导出</a-button>
        <a-upload
          name="file"
          :showUploadList="false"
          :multiple="false"
          :headers="tokenHeader"
          :action="importExcelUrl"
          @change="handleImportExcel"
        >
          <a-button type="primary" icon="import">导入</a-button>
        </a-upload>
        <a-button type="primary" icon="download" @click="handleExportXls('角色管理')">下载模板表格</a-button>
        <filter-fields :columns="columns" @changeColumns="changeColumns"></filter-fields>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="batchDel">
              <a-icon type="delete" />删除
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </a-space>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="data"
        :pagination="ipagination"
        :loading="loading"
        :scroll="scroll"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange,fixed:true}"
        class="j-table-force-nowrap"
      >
        <span slot="operation" slot-scope="text, record">
          <a @click="handlerEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">查看配置</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <a-modal :title="title" width="800px" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <d-virtual-tape-library v-if="visible" ref="dRouter"></d-virtual-tape-library>
    </a-modal>
  </a-card>
</template>

<script>
import data from '@/mock/tableListMock'

const columns = [
  { title: '序号', width: 100, dataIndex: 'number', key: 'number' },
  { title: '设备名称', width: 100, dataIndex: 'virtualLibrary', key: 'name' },
  { title: '序列号', dataIndex: 'numbers', key: '1' },
  { title: '型号', dataIndex: 'cabinet', key: '2' },
  { title: '制造商', dataIndex: 'physical', key: '3' },
  { title: '微码版本', dataIndex: 'version', key: '4' },
  { title: '管理IP', dataIndex: 'ip', key: '5' },
  { title: '驱动器数量', dataIndex: 'cpu', key: '6' },
  { title: '驱动器型号', dataIndex: 'equipmentType', key: '7' },
  { title: '驱动器序列号', dataIndex: 'numbers', key: '8' },
  { title: '驱动器微码', dataIndex: 'code', key: '9' },
  { title: '磁盘数量', dataIndex: 'cpu', key: '10' },
  { title: '磁盘总容量（GB）', dataIndex: 'gb', key: '11' },
  { title: 'U高', dataIndex: 'power', key: '12' },
  { title: '额定功率（KW）', dataIndex: 'kwPower', key: '13' },
  { title: '维保开始日期', dataIndex: 'date', key: '14' },
  { title: '维保服务商', dataIndex: 'physical', key: '15' },
  { title: '地理位置', dataIndex: 'address', key: '16' },
  { title: '机房', dataIndex: 'room', key: '17' },
  { title: '机柜', dataIndex: 'cabinet', key: '18' },
  { title: 'U位', dataIndex: 'cpu', key: '19' },
  {
    title: '操作',
    key: 'operation',
    width: 220,
    fixed: 'right',
    scopedSlots: { customRender: 'operation' },
  },
]

import FilterFields from '@/components/table-filterFields/'
import dVirtualTapeLibrary from './dialog/d-virtualTapeLibrary'
import { pagination } from '@/config/page'
import { shccsListMixin } from '@/mixins/shccsListMixin'

export default {
  name: 'TableList',
  mixins: [shccsListMixin],
  data() {
    return {
      visible: false, // 是否弹窗
      title: '新增', // 弹窗名称
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      data,
    }
  },
  watch: {
    columns(val) {},
  },
  components: {
    FilterFields,
    dVirtualTapeLibrary,
  },
  mounted() {},
  methods: {
    /**
     * 导入数据表格
     */
    importData({ event }) {
      this.$loading.show('正在下载表格模板，请稍等') // 显示loading
      setTimeout(() => {
        this.$loading.hide() // 隐藏loading
      }, 2000)
    },
    handleExportXls() {},
    /**
     * 查询
     */
    handlerQuery() {
      console.log(this.form)
      this.$loading.show('正在下载表格模板，请稍等') // 显示loading

      setTimeout(() => {
        this.$loading.hide() // 隐藏loading
      }, 2000)
    },
    /**
     * 重置
     */
    handlerReset() {
      console.log(form)
      this.form = Object.assign({}, form)
    },
    /**
     * 显示弹窗
     */
    showModal() {
      this.visible = true
    },
    /**
     * 分页事件
     */
    change(page, pageSize) {
      console.log(page, pageSize)
    },
    /**
     * 子组件传过来的事件
     *
     * 改变表头
     */
    changeColumns(columns) {
      this.columns = columns
    },
    /**
     * 查看事件
     *
     * row  当前行数据
     */
    handlerView(row) {
      console.log(row)
      this.visible = true
      this.title = '查看'
    },
    /**
     * 编辑事件
     *
     * row  当前行数据
     */
    handlerEdit(row) {
      this.visible = true
      this.title = '编辑'
    },
    /**
     * 删除事件
     *
     * row  当前行数据
     */
    handlerDel(row) {
      console.log('删除')
    },
    /**
     * 查看配置
     */
    viewConfiguration() {
      this.$router.push('/')
    },
    /**
     * 确认事件
     */
    handleOk() {
      let dRouter = this.$refs['dRouter']
      dRouter.onSubmit().then((res) => {
        if (res.is) {
          console.log(res.form)
          this.visible = false
        }
      })
      // 新增/修改 成功时，重载列表
      // this.$refs.table.refresh()
    },
    /**
     * 关闭弹窗
     */
    handleCancel(e) {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.table-operator {
  margin-bottom: 20px;
}

.operation {
  a {
    margin: 0 5px;
    color: rgb(0, 0, 255);
  }

  .delete {
    color: #d9001b;
  }
}
</style>