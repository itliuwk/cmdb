<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据库名称">
              <a-input placeholder="请输入数据库名称" v-model="queryParam.databaseName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据库服务名">
              <a-input placeholder="请输入数据库服务名" v-model="queryParam.serviceName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="数据库实例名称">
                <a-input placeholder="请输入数据库实例名称" v-model="queryParam.instanceName"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="Vip">
                <a-input placeholder="请输入Vip" v-model="queryParam.vipId"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="其他IP">
                <a-input placeholder="请输入其他IP" v-model="queryParam.otherIpId"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('数据库实例')">导出</a-button>
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
    <databaseInstance-modal ref="modalForm" @ok="modalFormOk"></databaseInstance-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import DatabaseInstanceModal from './modules/DatabaseInstanceModal'
import { shccsListMixin } from '@/mixins/shccsListMixin'
import FilterFields from '@/components/table-filterFields/'

export default {
  name: 'DatabaseInstanceList',
  mixins: [shccsListMixin],
  components: {
    DatabaseInstanceModal,
    FilterFields,
  },
  data() {
    return {
      description: '数据库实例管理页面',
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
          title: '数据库名称',
          align: 'center',
          dataIndex: 'databaseName',
        },
        {
          title: '数据库服务名',
          align: 'center',
          dataIndex: 'serviceName',
        },
        {
          title: '数据库实例名称',
          align: 'center',
          dataIndex: 'instanceName',
        },
        {
          title: 'Vip',
          align: 'center',
          dataIndex: 'vipId',
        },
        {
          title: '其他IP',
          align: 'center',
          dataIndex: 'otherIpId',
        },
        {
          title: '数据库监听端口',
          align: 'center',
          dataIndex: 'monitorPort',
        },
        {
          title: '数据库版本号',
          align: 'center',
          dataIndex: 'version',
        },
        {
          title: '数据库类型',
          align: 'center',
          dataIndex: 'databaseType',
        },
        {
          title: '安装某个虚拟机',
          align: 'center',
          dataIndex: 'virtualMachineId',
        },
        {
          title: '安装某个物理机',
          align: 'center',
          dataIndex: 'physicalMachineId',
        },
        {
          title: '数据库补丁号',
          align: 'center',
          dataIndex: 'patchNo',
        },
        {
          title: '对应的容灾Ci',
          align: 'center',
          dataIndex: 'disasterRecoveryCi',
        },
        {
          title: '是否双活',
          align: 'center',
          dataIndex: 'doubleActive',
        },
        {
          title: '集群节点性质',
          align: 'center',
          dataIndex: 'nodeNature',
        },
        {
          title: '属于某个集群',
          align: 'center',
          dataIndex: 'clusterId',
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
        list: '/cmdb/databaseInstance/list',
        delete: '/cmdb/databaseInstance/delete',
        deleteBatch: '/cmdb/databaseInstance/deleteBatch',
        exportXlsUrl: 'cmdb/databaseInstance/exportXls',
        importExcelUrl: 'cmdb/databaseInstance/importExcel',
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