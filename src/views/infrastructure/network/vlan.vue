<template>
  <!-- vlan页面 -->
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="queryParam">
        <a-row :gutter="48">
          <a-col :md="5" :sm="24">
            <a-form-item label="VLAN ID">
              <a-input v-model="queryParam.name" placeholder="请输入" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
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
      <d-vlan v-if="visible" ref="dRouter"></d-vlan>
    </a-modal>
  </a-card>
</template>

<script>
import data from '@/mock/tableListMock'

const columns = [
  { title: '序号', width: 100, dataIndex: 'number', key: 'number' },
  { title: 'VLAN ID', width: 100, dataIndex: 'id', key: 'id' },
  { title: 'VLAN 接口名称', dataIndex: 'vlan', key: '1' },
  { title: 'VLAN 接口IP地址', dataIndex: 'ip', key: '2' },
  { title: 'VLAN 接口IP地址掩码', dataIndex: 'mask', key: '3' },
  { title: '配置设备', dataIndex: 'router', key: '4' },
  { title: '描述', dataIndex: 'note', key: '5' },
  // { title: '创建人', dataIndex: 'xx', key: '15' },
  // { title: '创建时间', dataIndex: 'xx', key: '16' },
  // { title: '最后修改人', dataIndex: 'xx', key: '17' },
  // { title: '最后修改时间', dataIndex: 'xx', key: '18' },
  {
    title: '操作',
    key: 'operation',
    width: 220,
    fixed: 'right',
    scopedSlots: { customRender: 'operation' },
  },
]

import FilterFields from '@/components/table-filterFields/'
import dVlan from './dialog/d-vlan'
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
    columns(val) {
      // let length = val.length
      // let x = 2500
      // if (length < 17) {
      //   x = 2000
      // } else if (length < 15) {
      //   x = 1800
      // } else if (length < 10) {
      //   x = 1000
      // }
      // this.scroll = {
      //   x,
      // }
    },
  },
  components: {
    FilterFields,
    dVlan,
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