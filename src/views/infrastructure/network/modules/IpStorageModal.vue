<template>
  <j-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <div class="form-control">
      <a-spin :spinning="confirmLoading">
        <a-form :form="form">

            <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="设备名称">
            <a-input placeholder="请输入设备名称" v-decorator="['deviceName', validatorRules.deviceName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="机柜">
            <a-input placeholder="请输入机柜" v-decorator="['cabinetId', validatorRules.cabinetId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="序列号">
            <a-input placeholder="请输入序列号" v-decorator="['serialNo', validatorRules.serialNo ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="扩展柜序列号">
            <a-input placeholder="请输入扩展柜序列号" v-decorator="['expansionEnclosureSerialNo', validatorRules.expansionEnclosureSerialNo ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="型号">
            <a-input placeholder="请输入型号" v-decorator="['modelNo', validatorRules.modelNo ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="制造商">
            <a-input placeholder="请输入制造商" v-decorator="['manufacturer', validatorRules.manufacturer ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="微码版本">
            <a-input placeholder="请输入微码版本" v-decorator="['microcodeVersion', validatorRules.microcodeVersion ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="管理IP">
            <a-input placeholder="请输入管理IP" v-decorator="['ipId', validatorRules.ipId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="磁盘数量">
            <a-input placeholder="请输入磁盘数量" v-decorator="['disksNumber', validatorRules.disksNumber ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="存储裸容量（GB）">
            <a-input placeholder="请输入存储裸容量（GB）" v-decorator="['storageNakedCapacity', validatorRules.storageNakedCapacity ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="存储可用容量">
            <a-input placeholder="请输入存储可用容量" v-decorator="['storageAvailableCapacity', validatorRules.storageAvailableCapacity ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="存储剩余容量">
            <a-input placeholder="请输入存储剩余容量" v-decorator="['storageRemainingCapacity', validatorRules.storageRemainingCapacity ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="U高">
            <a-input placeholder="请输入U高" v-decorator="['uHight', validatorRules.uHight ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="额定功率">
            <a-input placeholder="请输入额定功率" v-decorator="['ratedPower', validatorRules.ratedPower ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="电流">
            <a-input placeholder="请输入电流" v-decorator="['electricCurrent', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="维保开始日期">
            <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'maintenanceStartTime', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="维保结束日期">
            <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'maintenanceEndTime', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="维保服务商">
            <a-input placeholder="请输入维保服务商" v-decorator="['maintenanceServiceProvider', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="地理位置">
            <a-input placeholder="请输入地理位置" v-decorator="['geographicalPosition', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="U位">
            <a-input placeholder="请输入U位" v-decorator="['uBit', {}]" />
          </a-form-item>

        </a-form>
      </a-spin>
    </div>
  </j-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "IpStorageModal",
    data () {
      return {
        title:"操作",
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
        validatorRules:{
        deviceName:{rules: [{ required: true, message: '请输入设备名称!' }]},
        cabinetId:{rules: [{ required: true, message: '请输入机柜!' }]},
        serialNo:{rules: [{ required: true, message: '请输入序列号!' }]},
        expansionEnclosureSerialNo:{rules: [{ required: true, message: '请输入扩展柜序列号!' }]},
        modelNo:{rules: [{ required: true, message: '请输入型号!' }]},
        manufacturer:{rules: [{ required: true, message: '请输入制造商!' }]},
        microcodeVersion:{rules: [{ required: true, message: '请输入微码版本!' }]},
        ipId:{rules: [{ required: true, message: '请输入管理IP!' }]},
        disksNumber:{rules: [{ required: true, message: '请输入磁盘数量!' }]},
        storageNakedCapacity:{rules: [{ required: true, message: '请输入存储裸容量（GB）!' }]},
        storageAvailableCapacity:{rules: [{ required: true, message: '请输入存储可用容量!' }]},
        storageRemainingCapacity:{rules: [{ required: true, message: '请输入存储剩余容量!' }]},
        uHight:{rules: [{ required: true, message: '请输入U高!' }]},
        ratedPower:{rules: [{ required: true, message: '请输入额定功率!' }]},
        },
        url: {
          add: "/cmdb/ipStorage/add",
          edit: "/cmdb/ipStorage/edit",
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'deviceName','cabinetId','serialNo','expansionEnclosureSerialNo','modelNo','manufacturer','microcodeVersion','ipId','disksNumber','storageNakedCapacity','storageAvailableCapacity','storageRemainingCapacity','uHight','ratedPower','electricCurrent','maintenanceStartTime','maintenanceEndTime','maintenanceServiceProvider','geographicalPosition','uBit'))
		  //时间格式化
        });

      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            formData.maintenanceStartTime = formData.maintenanceStartTime?formData.maintenanceStartTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.maintenanceEndTime = formData.maintenanceEndTime?formData.maintenanceEndTime.format('YYYY-MM-DD HH:mm:ss'):null;

            console.log(formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>
.form-control {
  max-height: 650px;
  overflow: auto;
}
</style>