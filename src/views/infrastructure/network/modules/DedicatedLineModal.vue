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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="网络端口id">
            <a-input placeholder="请输入网络端口id" v-decorator="['portId', validatorRules.portId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="专线名称">
            <a-input
              placeholder="请输入专线名称"
              v-decorator="['dedicatedLineName', validatorRules.dedicatedLineName]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="类型">
            <a-input placeholder="请输入类型" v-decorator="['type', validatorRules.type]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务开始时间">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['serviceStartTime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务结束时间">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['serviceEndTime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="服务商">
            <a-input placeholder="请输入服务商" v-decorator="['serviceProvider', {}]" />
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
  name: 'DedicatedLineModal',
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
        portId: { rules: [{ required: true, message: '请输入网络端口id!' }] },
        dedicatedLineName: { rules: [{ required: true, message: '请输入专线名称!' }] },
        type: { rules: [{ required: true, message: '请输入类型!' }] },
      },
      url: {
        add: '/cmdb/dedicatedLine/add',
        edit: '/cmdb/dedicatedLine/edit',
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
            'portId',
            'dedicatedLineName',
            'type',
            'serviceStartTime',
            'serviceEndTime',
            'serviceProvider'
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
          formData.serviceStartTime = formData.serviceStartTime
            ? moment(formData.serviceStartTime).format('YYYY-MM-DD HH:mm:ss')
            : null
          formData.serviceEndTime = formData.serviceEndTime
            ? moment(formData.serviceEndTime).format('YYYY-MM-DD HH:mm:ss')
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