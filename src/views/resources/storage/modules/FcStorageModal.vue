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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="设备名称">
            <a-input placeholder="请输入设备名称" v-decorator="['devicName', validatorRules.devicName]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="序列号">
            <a-input placeholder="请输入序列号" v-decorator="['serialNo', validatorRules.serialNo]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="扩展柜序列号">
            <a-input placeholder="请输入扩展柜序列号" v-decorator="['expansionEnclosureSerialNo', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="型号">
            <a-input placeholder="请输入型号" v-decorator="['modelNo', validatorRules.modelNo]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="制造商">
            <a-input placeholder="请输入制造商" v-decorator="['manufacturer', validatorRules.manufacturer]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="微码版本">
            <a-input placeholder="请输入微码版本" v-decorator="['microcodeVersion', validatorRules.microcodeVersion]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="管理IP">
            <a-input placeholder="请输入管理IP" v-decorator="['ipId', validatorRules.ipId]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="CACHE容量（GB）">
            <a-input
              placeholder="请输入CACHE容量（GB）"
              v-decorator="['cacheCapacity', validatorRules.cacheCapacity]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="磁盘数量">
            <a-input placeholder="请输入磁盘数量" v-decorator="['disksNumber', validatorRules.disksNumber]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="存储裸容量（GB）">
            <a-input
              placeholder="请输入存储裸容量（GB）"
              v-decorator="['storageNakedCapacity', validatorRules.storageNakedCapacity]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端口数量">
            <a-input placeholder="请输入前端口数量" v-decorator="['portsNumber', validatorRules.portsNumber]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="剩余前端口数量">
            <a-input
              placeholder="请输入剩余前端口数量"
              v-decorator="['remainingPortsNumber', validatorRules.remainingPortsNumber]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端口速率（GB/S)">
            <a-input placeholder="请输入前端口速率（GB/S)" v-decorator="['portRate', validatorRules.portRate]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U高">
            <a-input placeholder="请输入U高" v-decorator="['uHight', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="额定功率（KW）">
            <a-input placeholder="请输入额定功率（KW）" v-decorator="['ratedPower', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="电流（A）">
            <a-input placeholder="请输入电流（A）" v-decorator="['electricCurrent', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保开始日期">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['maintenanceStartTime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保结束日期">
            <a-date-picker showTime format="YYYY-MM-DD HH:mm:ss" v-decorator="['maintenanceEndTime', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="维保服务商">
            <a-input placeholder="请输入维保服务商" v-decorator="['maintenanceServiceProvider', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="地理位置">
            <a-input placeholder="请输入地理位置" v-decorator="['geographicalPosition', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机柜">
            <a-input placeholder="请输入机柜" v-decorator="['cabinet', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="U位">
            <a-input placeholder="请输入U位" v-decorator="['uBit', {}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="u数">
            <a-input placeholder="请输入u数" v-decorator="['uCount', validatorRules.uCount]" />
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
  name: 'FcStorageModal',
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
        devicName: { rules: [{ required: true, message: '请输入设备名称!' }] },
        serialNo: { rules: [{ required: true, message: '请输入序列号!' }] },
        modelNo: { rules: [{ required: true, message: '请输入型号!' }] },
        manufacturer: { rules: [{ required: true, message: '请输入制造商!' }] },
        microcodeVersion: { rules: [{ required: true, message: '请输入微码版本!' }] },
        ipId: { rules: [{ required: true, message: '请输入管理IP!' }] },
        cacheCapacity: { rules: [{ required: true, message: '请输入CACHE容量（GB）!' }] },
        disksNumber: { rules: [{ required: true, message: '请输入磁盘数量!' }] },
        storageNakedCapacity: { rules: [{ required: true, message: '请输入存储裸容量（GB）!' }] },
        portsNumber: { rules: [{ required: true, message: '请输入前端口数量!' }] },
        remainingPortsNumber: { rules: [{ required: true, message: '请输入剩余前端口数量!' }] },
        portRate: { rules: [{ required: true, message: '请输入前端口速率（GB/S)!' }] },
        uCount: { rules: [{ required: true, message: '请输入u数!' }] },
      },
      url: {
        add: '/cmdb/fcStorage/add',
        edit: '/cmdb/fcStorage/edit',
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
            'devicName',
            'serialNo',
            'expansionEnclosureSerialNo',
            'modelNo',
            'manufacturer',
            'microcodeVersion',
            'ipId',
            'cacheCapacity',
            'disksNumber',
            'storageNakedCapacity',
            'portsNumber',
            'remainingPortsNumber',
            'portRate',
            'uHight',
            'ratedPower',
            'electricCurrent',
            'maintenanceStartTime',
            'maintenanceEndTime',
            'maintenanceServiceProvider',
            'geographicalPosition',
            'cabinet',
            'uBit',
            'uCount'
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