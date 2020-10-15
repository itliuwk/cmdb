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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="刀箱管理IP">
            <a-input placeholder="请输入刀箱管理IP" v-decorator="['ipId', validatorRules.ipId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="型号">
            <a-input placeholder="请输入型号" v-decorator="['model', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序列号">
            <a-input placeholder="请输入序列号" v-decorator="['serialNo', validatorRules.serialNo]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="刀片容量">
            <a-input placeholder="请输入刀片容量" v-decorator="['bladeCapacity', validatorRules.bladeCapacity]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U数">
            <a-input placeholder="请输入U数" v-decorator="['uNumber', validatorRules.uNumber]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U位">
            <a-input placeholder="请输入U位" v-decorator="['uBit', validatorRules.uBit]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="功率">
            <a-input placeholder="请输入功率" v-decorator="['power', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机柜">
            <a-input placeholder="请输入机柜" v-decorator="['cabinetId', validatorRules.cabinetId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保开始日期">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="['maintenanceStartTime', validatorRules.maintenanceStartTime]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保结束日期">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="['maintenanceEndTime', validatorRules.maintenanceEndTime]"
            />
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
  name: 'BladeChassisModal',
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
        ipId: { rules: [{ required: true, message: '请输入刀箱管理IP!' }] },
        serialNo: { rules: [{ required: true, message: '请输入序列号!' }] },
        bladeCapacity: { rules: [{ required: true, message: '请输入刀片容量!' }] },
        uNumber: { rules: [{ required: true, message: '请输入U数!' }] },
        uBit: { rules: [{ required: true, message: '请输入U位!' }] },
        cabinetId: { rules: [{ required: true, message: '请输入机柜!' }] },
        maintenanceStartTime: { rules: [{ required: true, message: '请输入维保开始日期!' }] },
        maintenanceEndTime: { rules: [{ required: true, message: '请输入维保结束日期!' }] },
      },
      url: {
        add: '/cmdb/bladeChassis/add',
        edit: '/cmdb/bladeChassis/edit',
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
            'ipId',
            'model',
            'serialNo',
            'bladeCapacity',
            'uNumber',
            'uBit',
            'power',
            'cabinetId',
            'maintenanceStartTime',
            'maintenanceEndTime'
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
          formData.maintenanceStartTime = formData.maintenanceStartTime
            ? moment(formData.maintenanceStartTime).format('YYYY-MM-DD HH:mm:ss')
            : null
          formData.maintenanceEndTime = formData.maintenanceEndTime
            ? moment(formData.maintenanceEndTime).format('YYYY-MM-DD HH:mm:ss')
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