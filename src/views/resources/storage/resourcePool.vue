<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form-model :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="管理IP">
              <a-input placeholder="请输入"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="集群名称">
              <a-input placeholder="请输入"></a-input>
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

    <a-modal :title="title" width="800px" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <d-resourcePool ref="dResourcePool"></d-resourcePool>
    </a-modal>
  </a-card>
</template>

<script>
import data from '@/mock/tableListMock'

const columns = [
  { title: '序号', width: 100, dataIndex: 'number', key: 'number' },
  { title: '集群名称', width: 100, dataIndex: 'type', key: 'type' },
  { title: '类型', dataIndex: 'types', key: '1' },
  { title: '管理IP', dataIndex: 'ip', key: '2' },
  { title: '厂商', dataIndex: 'physical', key: '3' },
  { title: '存储大小', dataIndex: 'ram', key: '4' },
  { title: '已分配', dataIndex: 'hav', key: '5' },
  { title: '已使用', dataIndex: 'over', key: '6' },
  {
    title: '操作',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
]

import dResourcePool from './dialog/d-resourcePool'
import FilterFields from '@/components/table-filterFields/'
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
      confirmLoading: false,
      // visible: false,

      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      data,
    }
  },
  components: {
    dResourcePool,
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
      let dResourcePool = this.$refs['dResourcePool']
      dResourcePool.resetForm()
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
    handleEdit(record, title) {
      console.log(record)
      this.title = title
      this.openDia()
      // this.visible = true
    },
    handleOk() {
      // 新增/修改 成功时，重载列表
      // this.$refs.table.refresh()
      let dResourcePool = this.$refs['dResourcePool']
      dResourcePool.onSubmit().then((res) => {
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