<template>
  <j-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <div class="form-control">
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="应用系统名称">
            <a-input placeholder="请输入应用系统名称" v-decorator="['systemName', validatorRules.systemName]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="应用所属分类">
            <a-input placeholder="请输入应用所属分类" v-decorator="['ctegory', validatorRules.ctegory]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="应用系统实例名称">
            <a-input placeholder="请输入应用系统实例名称" v-decorator="['instanceName', validatorRules.instanceName]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开发负责人">
            <a-input placeholder="请输入开发负责人" v-decorator="['developmentHead', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="运维负责人">
            <a-input placeholder="请输入运维负责人" v-decorator="['operationMaintenanceHead', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="测试负责人">
            <a-input placeholder="请输入测试负责人" v-decorator="['testHead', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="开发责任部门">
            <a-input placeholder="请输入开发责任部门" v-decorator="['developmentDepartment', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="运维责任部门">
            <a-input placeholder="请输入运维责任部门" v-decorator="['operationMaintenanceDepartmen', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据库实例">
            <a-input
              placeholder="请输入数据库实例"
              v-decorator="['databaseInstance', validatorRules.databaseInstance]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务IP">
            <a-input placeholder="请输入服务IP" v-decorator="['ipId', validatorRules.ipId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务端口">
            <a-input placeholder="请输入服务端口" v-decorator="['servicePort', validatorRules.servicePort]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="测试责任部门">
            <a-input placeholder="请输入测试责任部门" v-decorator="['testDepartment', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维护窗口">
            <a-input placeholder="请输入维护窗口" v-decorator="['maintenanceWindow', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="最大停机时间">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['maxDowntime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="中间件集群">
            <a-input placeholder="请输入中间件集群" v-decorator="['middlewareCluster', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="安装于某个虚拟机">
            <a-input placeholder="请输入安装于某个虚拟机" v-decorator="['installVirtualMachine', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="安装于某个物理机">
            <a-input placeholder="请输入安装于某个物理机" v-decorator="['installPhysicalMachine', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="中间件实例">
            <a-input placeholder="请输入中间件实例" v-decorator="['middlewareInstanceId', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="应用层集群">
            <a-input placeholder="请输入应用层集群" v-decorator="['applicationClusterId', {}]" />
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
  </j-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import moment from 'moment'

export default {
  name: 'ApplicationSystemModal',
  data() {
    return {
      title: '操作',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },

      confirmLoading: false,
      form: this.$form.createForm(this),
      validatorRules: {
        systemName: { rules: [{ required: true, message: '请输入应用系统名称!' }] },
        ctegory: { rules: [{ required: true, message: '请输入应用所属分类!' }] },
        instanceName: { rules: [{ required: true, message: '请输入应用系统实例名称!' }] },
        databaseInstance: { rules: [{ required: true, message: '请输入数据库实例!' }] },
        ipId: { rules: [{ required: true, message: '请输入服务IP!' }] },
        servicePort: { rules: [{ required: true, message: '请输入服务端口!' }] },
      },
      url: {
        add: '/cmdb/applicationSystem/add',
        edit: '/cmdb/applicationSystem/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'systemName',
            'ctegory',
            'instanceName',
            'developmentHead',
            'operationMaintenanceHead',
            'testHead',
            'developmentDepartment',
            'operationMaintenanceDepartmen',
            'databaseInstance',
            'ipId',
            'servicePort',
            'testDepartment',
            'maintenanceWindow',
            'maxDowntime',
            'middlewareCluster',
            'installVirtualMachine',
            'installPhysicalMachine',
            'middlewareInstanceId',
            'applicationClusterId'
          )
        )
        //时间格式化
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.maxDowntime = formData.maxDowntime
            ? moment(formData.maxDowntime).format('YYYY-MM-DD HH:mm:ss')
            : null

          console.log(formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>

<style lang="less" scoped>
.form-control {
  max-height: 650px;
  overflow: auto;
}
</style>