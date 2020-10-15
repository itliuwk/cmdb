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
            label="接口名称">
            <a-input placeholder="请输入接口名称" v-decorator="['interfaceName', validatorRules.interfaceName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="接口方式">
            <a-input placeholder="请输入接口方式" v-decorator="['interfaceWay', validatorRules.interfaceWay ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="接口地址">
            <a-input placeholder="请输入接口地址" v-decorator="['interfaceAddress', validatorRules.interfaceAddress ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="开发负责人">
            <a-input placeholder="请输入开发负责人" v-decorator="['developmentHead', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="运维负责人">
            <a-input placeholder="请输入运维负责人" v-decorator="['operationMaintenanceHead', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="测试负责人">
            <a-input placeholder="请输入测试负责人" v-decorator="['testHead', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="开发责任部门">
            <a-input placeholder="请输入开发责任部门" v-decorator="['developmentDepartment', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="运维责任部门">
            <a-input placeholder="请输入运维责任部门" v-decorator="['operationMaintenanceDepartmen', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="测试责任部门">
            <a-input placeholder="请输入测试责任部门" v-decorator="['testDepartment', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="对端系统">
            <a-input placeholder="请输入对端系统" v-decorator="['endToEndSystem', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="对端信息">
            <a-input placeholder="请输入对端信息" v-decorator="['endToEndInfo', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="维护窗口">
            <a-input placeholder="请输入维护窗口" v-decorator="['maintenanceWindow', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="所属应用系统">
            <a-input placeholder="请输入所属应用系统" v-decorator="['applicationSystemId', validatorRules.applicationSystemId ]" />
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
    name: "ApplicationSystemInterfaceModal",
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
        interfaceName:{rules: [{ required: true, message: '请输入接口名称!' }]},
        interfaceWay:{rules: [{ required: true, message: '请输入接口方式!' }]},
        interfaceAddress:{rules: [{ required: true, message: '请输入接口地址!' }]},
        applicationSystemId:{rules: [{ required: true, message: '请输入所属应用系统!' }]},
        },
        url: {
          add: "/cmdb/applicationSystemInterface/add",
          edit: "/cmdb/applicationSystemInterface/edit",
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
          this.form.setFieldsValue(pick(this.model,'interfaceName','interfaceWay','interfaceAddress','developmentHead','operationMaintenanceHead','testHead','developmentDepartment','operationMaintenanceDepartmen','testDepartment','endToEndSystem','endToEndInfo','maintenanceWindow','applicationSystemId'))
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