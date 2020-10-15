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
            label="备份主机IP地址">
            <a-input placeholder="请输入备份主机IP地址" v-decorator="['ipId', validatorRules.ipId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="相关应用系统">
            <a-input placeholder="请输入相关应用系统" v-decorator="['applicationSystemId', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="备份方式">
            <a-input placeholder="请输入备份方式" v-decorator="['backupWay', validatorRules.backupWay ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="备份策略">
            <a-input placeholder="请输入备份策略" v-decorator="['backupStrategy', validatorRules.backupStrategy ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="状态">
            <a-input placeholder="请输入状态" v-decorator="['status', validatorRules.status ]" />
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
    name: "BackupStrategyModal",
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
        ipId:{rules: [{ required: true, message: '请输入备份主机IP地址!' }]},
        backupWay:{rules: [{ required: true, message: '请输入备份方式!' }]},
        backupStrategy:{rules: [{ required: true, message: '请输入备份策略!' }]},
        status:{rules: [{ required: true, message: '请输入状态!' }]},
        },
        url: {
          add: "/cmdb/backupStrategy/add",
          edit: "/cmdb/backupStrategy/edit",
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
          this.form.setFieldsValue(pick(this.model,'ipId','applicationSystemId','backupWay','backupStrategy','status'))
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