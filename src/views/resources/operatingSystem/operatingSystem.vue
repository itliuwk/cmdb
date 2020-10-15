<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应用系统名称">
              <a-input placeholder="请输入应用系统名称" v-model="queryParam.systemName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="应用所属分类">
              <a-input placeholder="请输入应用所属分类" v-model="queryParam.ctegory"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="应用系统实例名称">
                <a-input placeholder="请输入应用系统实例名称" v-model="queryParam.instanceName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="开发负责人">
                <a-input placeholder="请输入开发负责人" v-model="queryParam.developmentHead"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="运维负责人">
                <a-input placeholder="请输入运维负责人" v-model="queryParam.operationMaintenanceHead"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('应用系统')">导出</a-button>
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
      <filter-fields :columns="columns" @changeColumns="changeColumns"></filter-fields>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :scroll="scroll"
        class="j-table-force-nowrap"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
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

    <!-- 表单区域 -->
    <applicationSystem-modal ref="modalForm" @ok="modalFormOk"></applicationSystem-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import ApplicationSystemModal from './modules/ApplicationSystemModal'
import { shccsListMixin } from '@/mixins/shccsListMixin'
import FilterFields from '@/components/table-filterFields/'

export default {
  name: 'ApplicationSystemList',
  mixins: [shccsListMixin],
  components: {
    ApplicationSystemModal,
    FilterFields,
  },
  data() {
    return {
      description: '应用系统管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '应用系统名称',
          align: 'center',
          dataIndex: 'systemName',
        },
        {
          title: '应用所属分类',
          align: 'center',
          dataIndex: 'ctegory',
        },
        {
          title: '应用系统实例名称',
          align: 'center',
          dataIndex: 'instanceName',
        },
        {
          title: '开发负责人',
          align: 'center',
          dataIndex: 'developmentHead',
        },
        {
          title: '运维负责人',
          align: 'center',
          dataIndex: 'operationMaintenanceHead',
        },
        {
          title: '测试负责人',
          align: 'center',
          dataIndex: 'testHead',
        },
        {
          title: '开发责任部门',
          align: 'center',
          dataIndex: 'developmentDepartment',
        },
        {
          title: '运维责任部门',
          align: 'center',
          dataIndex: 'operationMaintenanceDepartmen',
        },
        {
          title: '数据库实例',
          align: 'center',
          dataIndex: 'databaseInstance',
        },
        {
          title: '服务IP',
          align: 'center',
          dataIndex: 'ipId',
        },
        {
          title: '服务端口',
          align: 'center',
          dataIndex: 'servicePort',
        },
        {
          title: '测试责任部门',
          align: 'center',
          dataIndex: 'testDepartment',
        },
        {
          title: '维护窗口',
          align: 'center',
          dataIndex: 'maintenanceWindow',
        },
        {
          title: '最大停机时间',
          align: 'center',
          dataIndex: 'maxDowntime',
        },
        {
          title: '中间件集群',
          align: 'center',
          dataIndex: 'middlewareCluster',
        },
        {
          title: '安装于某个虚拟机',
          align: 'center',
          dataIndex: 'installVirtualMachine',
        },
        {
          title: '安装于某个物理机',
          align: 'center',
          dataIndex: 'installPhysicalMachine',
        },
        {
          title: '中间件实例',
          align: 'center',
          dataIndex: 'middlewareInstanceId',
        },
        {
          title: '应用层集群',
          align: 'center',
          dataIndex: 'applicationClusterId',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 220,
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/cmdb/applicationSystem/list',
        delete: '/cmdb/applicationSystem/delete',
        deleteBatch: '/cmdb/applicationSystem/deleteBatch',
        exportXlsUrl: 'cmdb/applicationSystem/exportXls',
        importExcelUrl: 'cmdb/applicationSystem/importExcel',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    changeColumns(columns) {
      this.columns = columns
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>