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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="ip地址">
            <a-input placeholder="请输入ip地址" v-decorator="['ipAddress', validatorRules.ipAddress]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="子网掩码">
            <a-input placeholder="请输入子网掩码" v-decorator="['cobaltPhosphate', validatorRules.cobaltPhosphate]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网关地址">
            <a-input placeholder="请输入网关地址" v-decorator="['getwayAddress', validatorRules.getwayAddress]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
            <a-input placeholder="请输入状态" v-decorator="['status', validatorRules.status]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="使用者">
            <a-input placeholder="请输入使用者" v-decorator="['employUser', validatorRules.employUser]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="VLAN_ID">
            <a-input placeholder="请输入VLAN_ID" v-decorator="['vlanId', validatorRules.vlanId]" />
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
  name: 'IpModal',
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
        ipAddress: { rules: [{ required: true, message: '请输入ip地址!' }] },
        cobaltPhosphate: { rules: [{ required: true, message: '请输入子网掩码!' }] },
        getwayAddress: { rules: [{ required: true, message: '请输入网关地址!' }] },
        status: { rules: [{ required: true, message: '请输入状态!' }] },
        employUser: { rules: [{ required: true, message: '请输入使用者!' }] },
        vlanId: { rules: [{ required: true, message: '请输入VLAN_ID!' }] },
      },
      url: {
        add: '/cmdb/ip/add',
        edit: '/cmdb/ip/edit',
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
          pick(this.model, 'ipAddress', 'cobaltPhosphate', 'getwayAddress', 'status', 'employUser', 'vlanId')
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