<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="schema名称">
              <a-input placeholder="请输入schema名称" v-model="queryParam.schemaName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="数据库实例名称">
              <a-input placeholder="请输入数据库实例名称" v-model="queryParam.databaseInstanceId"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="属于某个集群">
              <a-input placeholder="请输入属于某个集群" v-model="queryParam.clusterId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="安装于某个虚拟机">
              <a-input placeholder="请输入安装于某个虚拟机" v-model="queryParam.installVirtualMachine"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="安装于莫个物理机">
              <a-input placeholder="请输入安装于莫个物理机" v-model="queryParam.installPhysicalMachine"></a-input>
            </a-form-item>
          </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('schema 实体')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <filter-fields :columns="columns" @changeColumns="changeColumns"></filter-fields>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

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
    <databaseSchema-modal ref="modalForm" @ok="modalFormOk"></databaseSchema-modal>
  </a-card>
</template>

<script>
  import '@/assets/less/TableExpand.less'
  import DatabaseSchemaModal from './modules/DatabaseSchemaModal'
  import { shccsListMixin } from '@/mixins/shccsListMixin'
  import FilterFields from '@/components/table-filterFields/'

  export default {
    name: "DatabaseSchemaList",
    mixins:[shccsListMixin],
    components: {
      DatabaseSchemaModal,
      FilterFields
    },
    data () {
      return {
        description: 'schema 实体管理页面',
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: 'schema名称',
            align:"center",
            dataIndex: 'schemaName'
           },
		   {
            title: '数据库实例名称',
            align:"center",
            dataIndex: 'databaseInstanceId'
           },
		   {
            title: '属于某个集群',
            align:"center",
            dataIndex: 'clusterId'
           },
		   {
            title: '安装于某个虚拟机',
            align:"center",
            dataIndex: 'installVirtualMachine'
           },
		   {
            title: '安装于莫个物理机',
            align:"center",
            dataIndex: 'installPhysicalMachine'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            width: 220,
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/cmdb/databaseSchema/list",
          delete: "/cmdb/databaseSchema/delete",
          deleteBatch: "/cmdb/databaseSchema/deleteBatch",
          exportXlsUrl: "cmdb/databaseSchema/exportXls",
          importExcelUrl: "cmdb/databaseSchema/importExcel",
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
      changeColumns(columns) {
        this.columns = columns
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>