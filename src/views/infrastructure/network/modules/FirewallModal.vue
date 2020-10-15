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
            label="防火墙名称">
            <a-input placeholder="请输入防火墙名称" v-decorator="['firewallName', validatorRules.firewallName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="管理ip">
            <a-input placeholder="请输入管理ip" v-decorator="['ipId', validatorRules.ipId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="序列号">
            <a-input placeholder="请输入序列号" v-decorator="['serialNumber', validatorRules.serialNumber ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="型号">
            <a-input placeholder="请输入型号" v-decorator="['model', validatorRules.model ]" />
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
            label="OS版本">
            <a-input placeholder="请输入OS版本" v-decorator="['osVersion', validatorRules.osVersion ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="U高">
            <a-input placeholder="请输入U高" v-decorator="['uHigh', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="额定功率">
            <a-input placeholder="请输入额定功率" v-decorator="['ratedPower', {}]" />
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
            <a-input placeholder="请输入地理位置" v-decorator="['location', {}]" />
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
    name: "FirewallModal",
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
        firewallName:{rules: [{ required: true, message: '请输入防火墙名称!' }]},
        ipId:{rules: [{ required: true, message: '请输入管理ip!' }]},
        serialNumber:{rules: [{ required: true, message: '请输入序列号!' }]},
        model:{rules: [{ required: true, message: '请输入型号!' }]},
        manufacturer:{rules: [{ required: true, message: '请输入制造商!' }]},
        osVersion:{rules: [{ required: true, message: '请输入OS版本!' }]},
        },
        url: {
          add: "/cmdb/firewall/add",
          edit: "/cmdb/firewall/edit",
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
          this.form.setFieldsValue(pick(this.model,'firewallName','ipId','serialNumber','model','manufacturer','osVersion','uHigh','ratedPower','maintenanceStartTime','maintenanceEndTime','maintenanceServiceProvider','location'))
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