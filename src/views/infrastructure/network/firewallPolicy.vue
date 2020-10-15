<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="防火墙策略名称">
              <a-input placeholder="请输入防火墙策略名称" v-model="queryParam.firewallTacticsName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="防火墙名称">
              <a-input placeholder="请输入防火墙名称" v-model="queryParam.finrewallNameId"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="描述">
                <a-input placeholder="请输入描述" v-model="queryParam.discription"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="源安全区域">
                <a-input placeholder="请输入源安全区域" v-model="queryParam.sourceSecurityZone"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="目的安全区域">
                <a-input placeholder="请输入目的安全区域" v-model="queryParam.destinationSecurityZone"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('防火墙策略')">导出</a-button>
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
    <firewallTactics-modal ref="modalForm" @ok="modalFormOk"></firewallTactics-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import FirewallTacticsModal from './modules/FirewallTacticsModal'
import { shccsListMixin } from '@/mixins/shccsListMixin'
import FilterFields from '@/components/table-filterFields/'

export default {
  name: 'FirewallTacticsList',
  mixins: [shccsListMixin],
  components: {
    FirewallTacticsModal,
    FilterFields,
  },
  data() {
    return {
      description: '防火墙策略管理页面',
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
          title: '防火墙策略名称',
          align: 'center',
          dataIndex: 'firewallTacticsName',
        },
        {
          title: '防火墙名称',
          align: 'center',
          dataIndex: 'finrewallNameId',
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'discription',
        },
        {
          title: '源安全区域',
          align: 'center',
          dataIndex: 'sourceSecurityZone',
        },
        {
          title: '目的安全区域',
          align: 'center',
          dataIndex: 'destinationSecurityZone',
        },
        {
          title: '源地址',
          align: 'center',
          dataIndex: 'sourceAddress',
        },
        {
          title: '目的地址',
          align: 'center',
          dataIndex: 'destinationAddress',
        },
        {
          title: '用户',
          align: 'center',
          dataIndex: 'user',
        },
        {
          title: '服务',
          align: 'center',
          dataIndex: 'service',
        },
        {
          title: '应用',
          align: 'center',
          dataIndex: 'aplication',
        },
        {
          title: '动作',
          align: 'center',
          dataIndex: 'action',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
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
        list: '/cmdb/firewallTactics/list',
        delete: '/cmdb/firewallTactics/delete',
        deleteBatch: '/cmdb/firewallTactics/deleteBatch',
        exportXlsUrl: 'cmdb/firewallTactics/exportXls',
        importExcelUrl: 'cmdb/firewallTactics/importExcel',
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