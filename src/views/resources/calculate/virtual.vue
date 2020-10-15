<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="虚拟服务器名称">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item>
              <a-button type="primary">查询</a-button>
              <a-button type="primary" style="margin-left: 8px">重置</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
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
    <a-modal
      :title="title"
      width="800px"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :okButtonProps="{props:{disabled}}"
    >
      <d-virtual ref="dVirtual"></d-virtual>
    </a-modal>
  </a-card>
</template>

<script>
import data from '@/mock/tableListMock'

const columns = [
  { title: '序号', dataIndex: 'number', key: 'number' },
  { title: '操作系统类型', dataIndex: 'attributes', key: 'type' },
  { title: '操作系统版本', dataIndex: 'version', key: '1' },
  { title: '操作系统补丁号', dataIndex: 'patch', key: '2' },
  { title: '主机名', dataIndex: 'host', key: '3' },
  { title: '业务IP', dataIndex: 'ip', key: '4' },
  { title: 'CPU(C)', dataIndex: 'cpu', key: '5' },
  { title: '内存（GB）', dataIndex: 'ram', key: '6' },
  { title: '磁盘容（GB)', dataIndex: 'gb', key: '7' },
  { title: 'WWPN列表', dataIndex: 'ip', key: '8' },
  { title: '其他IP', dataIndex: 'ip', key: '9' },
  { title: 'HA节点性质', dataIndex: 'node', key: '10' },
  { title: '管理员', dataIndex: 'headOfMaintenance', key: '11' },
  { title: 'NAS IP', dataIndex: 'ip', key: '12' },
  { title: '应用实例', dataIndex: 'sysName', key: '13' },
  { title: '存储虚拟化配置', dataIndex: 'setting', key: '14' },
  { title: '存储逻辑配置', dataIndex: 'logic', key: '15' },
  { title: '物理机主机名（管理IP)', dataIndex: 'ip', key: '16' },
  { title: '物理机集群名称', dataIndex: 'type', key: '17' },
  { title: '安全责任人', dataIndex: 'headOfMaintenance', key: '18' },
  { title: '创建日期标记', dataIndex: 'date', key: '19' },
  { title: '回收日期标记', dataIndex: 'dateEnd', key: '20' },
  { title: '备注', dataIndex: 'note', key: '21' },
  {
    title: '操作',
    key: 'operation',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'operation' },
  },
]

import dVirtual from './dialog/d-virtual'
import FilterFields from '@/components/table-filterFields/'
import { pagination } from '@/config/page'
import { shccsListMixin } from '@/mixins/shccsListMixin'

export default {
  name: 'TableList',
  mixins: [shccsListMixin],
  data() {
    return {
      title: '新增',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
      disabled: false,
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      data,
    }
  },
  components: {
    dVirtual,
    FilterFields,
  },
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
    /*
     * 导出
     * */
    handleExportXls() {},
    changeColumns(columns) {
      this.columns = columns
    },
    openDia() {
      this.visible = true
    },
    handleCancel() {
      this.visible = false
      let dVirtual = this.$refs['dVirtual']
      dVirtual.resetForm()
    },
    del(index) {
      const that = this
      this.$confirm({
        title: '警告',
        content: '真的要删除吗?',
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
          // 在这里调用删除接口
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          // }).catch(() => console.log('Oops errors!'));
          that.data.splice(0, 1)
        },
        onCancel() {
          console.log('Cancel')
        },
      })
    },
    /**
     * @description: 查看编辑
     * @params
     * @return any
     */
    handleEdit(record, type) {
      if (type && type === 'check') {
        this.title = '查看'
        this.disabled = true
      } else {
        this.title = '编辑'
        this.disabled = false
      }
      this.visible = true
    },
    handleOk() {
      // 新增/修改 成功时，重载列表
      // this.$refs.table.refresh()
      let dVirtual = this.$refs['dVirtual']
      dVirtual.onSubmit().then((res) => {
        if (res.is) {
          console.log(res.form)
          this.visible = false
        }
      })
    },
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  },
}
</script>

<style lang="less" scoped>
.table-operator {
  margin-bottom: 20px;

  /deep/ .ant-btn {
    margin-left: 15px;
  }

  /deep/ .wrapper {
    margin: 0;
  }
}

.progress {
  display: inline-block;
  position: relative;

  /deep/ .ant-progress {
    position: absolute;
    left: 15px;
    bottom: -15px;
  }
}

.operation {
  a {
    margin: 0 5px;
    color: rgb(0, 0, 255);
    font-size: 12px;
  }

  .delete {
    color: #d9001b;
  }

  .check-edit {
    color: #2878ff;
  }
}
</style>