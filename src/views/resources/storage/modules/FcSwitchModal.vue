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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="交换机名称">
            <a-input placeholder="请输入交换机名称" v-decorator="['switchName', validatorRules.switchName]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序列号">
            <a-input placeholder="请输入序列号" v-decorator="['serialNumber', validatorRules.serialNumber]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="型号">
            <a-input placeholder="请输入型号" v-decorator="['model', validatorRules.model]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="制造商">
            <a-input placeholder="请输入制造商" v-decorator="['manufacturer', validatorRules.manufacturer]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微码版本">
            <a-input placeholder="请输入微码版本" v-decorator="['microcodeVersion', validatorRules.microcodeVersion]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管理ip">
            <a-input placeholder="请输入管理ip" v-decorator="['ipId', validatorRules.ipId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U高">
            <a-input placeholder="请输入U高" v-decorator="['uHigh', validatorRules.uHigh]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="额定功率">
            <a-input placeholder="请输入额定功率" v-decorator="['ratedPower', validatorRules.ratedPower]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保开始日期">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['maintenanceStartDate', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保结束日期">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['maintenanceEndTime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保服务商">
            <a-input placeholder="请输入维保服务商" v-decorator="['maintenaceServiceProvider', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地理位置">
            <a-input placeholder="请输入地理位置" v-decorator="['location', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U位">
            <a-input placeholder="请输入U位" v-decorator="['uBit', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机柜(关联字段)">
            <a-input placeholder="请输入机柜(关联字段)" v-decorator="['cabinetId', validatorRules.cabinetId]" />
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
  name: 'FcSwitchModal',
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
        switchName: { rules: [{ required: true, message: '请输入交换机名称!' }] },
        serialNumber: { rules: [{ required: true, message: '请输入序列号!' }] },
        model: { rules: [{ required: true, message: '请输入型号!' }] },
        manufacturer: { rules: [{ required: true, message: '请输入制造商!' }] },
        microcodeVersion: { rules: [{ required: true, message: '请输入微码版本!' }] },
        ipId: { rules: [{ required: true, message: '请输入管理ip!' }] },
        uHigh: { rules: [{ required: true, message: '请输入U高!' }] },
        ratedPower: { rules: [{ required: true, message: '请输入额定功率!' }] },
        cabinetId: { rules: [{ required: true, message: '请输入机柜(关联字段)!' }] },
      },
      url: {
        add: '/cmdb/fcSwitch/add',
        edit: '/cmdb/fcSwitch/edit',
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
            'switchName',
            'serialNumber',
            'model',
            'manufacturer',
            'microcodeVersion',
            'ipId',
            'uHigh',
            'ratedPower',
            'maintenanceStartDate',
            'maintenanceEndTime',
            'maintenaceServiceProvider',
            'location',
            'uBit',
            'cabinetId'
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
          formData.maintenanceStartDate = formData.maintenanceStartDate
            ? moment(formData.maintenanceStartDate).format('YYYY-MM-DD HH:mm:ss')
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