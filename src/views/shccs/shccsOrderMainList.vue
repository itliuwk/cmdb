<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="订单号">
              <a-input placeholder="请输入订单号" v-model="queryParam.orderCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="订单类型">
              <a-input placeholder="请输入订单类型" v-model="queryParam.ctype"></a-input>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="订单日期">
                <a-input placeholder="请输入订单日期" v-model="queryParam.orderDate"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="订单金额">
                <a-input placeholder="请输入订单金额" v-model="queryParam.orderMoney"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="订单备注">
                <a-input placeholder="请输入订单备注" v-model="queryParam.content"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
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
      <a-button type="primary" icon="download" @click="handleExportXls('测试注释')">导出</a-button>
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
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
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
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        class="j-table-force-nowrap"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a class @click="handleCheck">查看</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>
                <a class @click="handleSetting">查看配置</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <shccsOrderMainModal ref="orderMainModal"></shccsOrderMainModal>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <!--    <shccsOrderMain-modal ref="modalForm" @ok="modalFormOk"></shccsOrderMain-modal>-->
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import shccsOrderMainModal from './modules/shccsOrderMainModal'
import { shccsListMixin } from '@/mixins/shccsListMixin'
import FilterFields from '@/components/table-filterFields/'
import data from '@/mock/tableListMock'

export default {
  name: 'shccsOrderMainList',
  mixins: [shccsListMixin],
  components: {
    shccsOrderMainModal,
    FilterFields,
  },
  data() {
    return {
      description: '测试注释管理页面',
      data,
      // 表头
      columns: [
        // {
        //   title: '#',
        //   dataIndex: '',
        //   key: 'rowIndex',
        //   width: 60,
        //   align: 'center',
        //   customRender: function(t, r, index) {
        //     return parseInt(index) + 1
        //   }
        // },
        {
          title: '订单号',
          align: 'center',
          dataIndex: 'orderCode',
        },
        {
          title: '订单类型',
          align: 'center',
          dataIndex: 'ctype',
        },
        {
          title: '订单日期',
          align: 'center',
          dataIndex: 'orderDate',
          sorter: true,
          needTotal: true,
          // customRender: (text) => text + ' 次',
        },
        {
          title: '订单金额',
          align: 'center',
          dataIndex: 'orderMoney',
        },
        {
          title: '订单备注',
          align: 'center',
          dataIndex: 'content',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/cn.com.shccs/shccsOrderMain/list',
        delete: '/cn.com.shccs/shccsOrderMain/delete',
        deleteBatch: '/cn.com.shccs/shccsOrderMain/deleteBatch',
        exportXlsUrl: 'cn.com.shccs/shccsOrderMain/exportXls',
        importExcelUrl: 'cn.com.shccs/shccsOrderMain/importExcel',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    /**
     * 子组件传过来的事件
     *
     * 改变表头
     */
    changeColumns(columns) {
      this.columns = columns
    },
    /**
     * @description: 删除
     * @params
     * @return any
     */
    handleDelete() {},
    /**
     * @description: 编辑
     * @params
     * @return any
     */
    handleEdit() {
      this.$refs.orderMainModal.visible = true
    },
    handleCheck() {
      this.$refs.orderMainModal.visible = true
    },
    handleSetting() {
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>