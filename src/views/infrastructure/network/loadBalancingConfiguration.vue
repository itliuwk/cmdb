<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="负载均衡配置名称">
              <a-input placeholder="请输入负载均衡配置名称" v-model="queryParam.loadBalancingConfigurationNa"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="域名">
              <a-input placeholder="请输入域名" v-model="queryParam.domainName"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="服务IP">
                <a-input placeholder="请输入服务IP" v-model="queryParam.ipService"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="服务端口">
                <a-input placeholder="请输入服务端口" v-model="queryParam.serviceProt"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="成员ip+端口">
                <a-input placeholder="请输入成员ip+端口" v-model="queryParam.memberIpPort"></a-input>
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
      <a-button type="primary" icon="download" @click="handleExportXls('负载均衡配置')">导出</a-button>
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
    <loadBalancingConfiguration-modal ref="modalForm" @ok="modalFormOk"></loadBalancingConfiguration-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import LoadBalancingConfigurationModal from './modules/LoadBalancingConfigurationModal'
import { shccsListMixin } from '@/mixins/shccsListMixin'
import FilterFields from '@/components/table-filterFields/'

export default {
  name: 'LoadBalancingConfigurationList',
  mixins: [shccsListMixin],
  components: {
    LoadBalancingConfigurationModal,
    FilterFields,
  },
  data() {
    return {
      description: '负载均衡配置管理页面',
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
          title: '负载均衡配置名称',
          align: 'center',
          dataIndex: 'loadBalancingConfigurationNa',
        },
        {
          title: '域名',
          align: 'center',
          dataIndex: 'domainName',
        },
        {
          title: '服务IP',
          align: 'center',
          dataIndex: 'ipService',
        },
        {
          title: '服务端口',
          align: 'center',
          dataIndex: 'serviceProt',
        },
        {
          title: '成员ip+端口',
          align: 'center',
          dataIndex: 'memberIpPort',
        },
        {
          title: '应用系统',
          align: 'center',
          dataIndex: 'applicationSystemId',
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'remarks',
        },
        {
          title: '负载均衡设备Id',
          align: 'center',
          dataIndex: 'loadBalancingEquipmentId',
        },
        {
          title: '负载均衡类型',
          align: 'center',
          dataIndex: 'loadBalancingType',
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
        list: '/cmdb/loadBalancingConfiguration/list',
        delete: '/cmdb/loadBalancingConfiguration/delete',
        deleteBatch: '/cmdb/loadBalancingConfiguration/deleteBatch',
        exportXlsUrl: 'cmdb/loadBalancingConfiguration/exportXls',
        importExcelUrl: 'cmdb/loadBalancingConfiguration/importExcel',
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