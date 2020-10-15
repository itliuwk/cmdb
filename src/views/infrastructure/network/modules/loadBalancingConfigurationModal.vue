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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负载均衡配置名称">
            <a-input
              placeholder="请输入负载均衡配置名称"
              v-decorator="['loadBalancingConfigurationNa', validatorRules.loadBalancingConfigurationNa]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="域名">
            <a-input placeholder="请输入域名" v-decorator="['domainName', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务IP">
            <a-input placeholder="请输入服务IP" v-decorator="['ipService', validatorRules.ipService]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务端口">
            <a-input placeholder="请输入服务端口" v-decorator="['serviceProt', validatorRules.serviceProt]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="成员ip+端口">
            <a-input placeholder="请输入成员ip+端口" v-decorator="['memberIpPort', validatorRules.memberIpPort]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="应用系统">
            <a-input
              placeholder="请输入应用系统"
              v-decorator="['applicationSystemId', validatorRules.applicationSystemId]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
            <a-input placeholder="请输入备注" v-decorator="['remarks', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负载均衡设备Id">
            <a-input
              placeholder="请输入负载均衡设备Id"
              v-decorator="['loadBalancingEquipmentId', validatorRules.loadBalancingEquipmentId]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负载均衡类型">
            <a-input placeholder="请输入负载均衡类型" v-decorator="['loadBalancingType', {}]" />
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
  name: 'loadBalancingConfigurationModal',
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
        loadBalancingConfigurationNa: { rules: [{ required: true, message: '请输入负载均衡配置名称!' }] },
        ipService: { rules: [{ required: true, message: '请输入服务IP!' }] },
        serviceProt: { rules: [{ required: true, message: '请输入服务端口!' }] },
        memberIpPort: { rules: [{ required: true, message: '请输入成员ip+端口!' }] },
        applicationSystemId: { rules: [{ required: true, message: '请输入应用系统!' }] },
        loadBalancingEquipmentId: { rules: [{ required: true, message: '请输入负载均衡设备Id!' }] },
      },
      url: {
        add: '/cmdb/loadBalancingConfiguration/add',
        edit: '/cmdb/loadBalancingConfiguration/edit',
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
            'loadBalancingConfigurationNa',
            'domainName',
            'ipService',
            'serviceProt',
            'memberIpPort',
            'applicationSystemId',
            'remarks',
            'loadBalancingEquipmentId',
            'loadBalancingType'
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