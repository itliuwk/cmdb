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
            label="端口名称">
            <a-input placeholder="请输入端口名称" v-decorator="['portName', validatorRules.portName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="端口速率">
            <a-input placeholder="请输入端口速率" v-decorator="['portRate', validatorRules.portRate ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="对端设备">
            <a-input placeholder="请输入对端设备" v-decorator="['oppositeDevice', validatorRules.oppositeDevice ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="对端设备端口">
            <a-input placeholder="请输入对端设备端口" v-decorator="['peerDevicePort', validatorRules.peerDevicePort ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="端口WWN">
            <a-input placeholder="请输入端口WWN" v-decorator="['wwnPort', validatorRules.wwnPort ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="设备名称Id">
            <a-input placeholder="请输入设备名称Id" v-decorator="['deviceId', validatorRules.deviceId ]" />
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
    name: "FcPortModal",
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
        portName:{rules: [{ required: true, message: '请输入端口名称!' }]},
        portRate:{rules: [{ required: true, message: '请输入端口速率!' }]},
        oppositeDevice:{rules: [{ required: true, message: '请输入对端设备!' }]},
        peerDevicePort:{rules: [{ required: true, message: '请输入对端设备端口!' }]},
        wwnPort:{rules: [{ required: true, message: '请输入端口WWN!' }]},
        deviceId:{rules: [{ required: true, message: '请输入设备名称Id!' }]},
        },
        url: {
          add: "/cmdb/fcPort/add",
          edit: "/cmdb/fcPort/edit",
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
          this.form.setFieldsValue(pick(this.model,'portName','portRate','oppositeDevice','peerDevicePort','wwnPort','deviceId'))
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