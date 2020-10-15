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
            label="防火墙策略名称">
            <a-input placeholder="请输入防火墙策略名称" v-decorator="['firewallTacticsName', validatorRules.firewallTacticsName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="防火墙名称">
            <a-input placeholder="请输入防火墙名称" v-decorator="['finrewallNameId', validatorRules.finrewallNameId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="描述">
            <a-input placeholder="请输入描述" v-decorator="['discription', validatorRules.discription ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="源安全区域">
            <a-input placeholder="请输入源安全区域" v-decorator="['sourceSecurityZone', validatorRules.sourceSecurityZone ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="目的安全区域">
            <a-input placeholder="请输入目的安全区域" v-decorator="['destinationSecurityZone', validatorRules.destinationSecurityZone ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="源地址">
            <a-input placeholder="请输入源地址" v-decorator="['sourceAddress', validatorRules.sourceAddress ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="目的地址">
            <a-input placeholder="请输入目的地址" v-decorator="['destinationAddress', validatorRules.destinationAddress ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="用户">
            <a-input placeholder="请输入用户" v-decorator="['user', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="服务">
            <a-input placeholder="请输入服务" v-decorator="['service', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="应用">
            <a-input placeholder="请输入应用" v-decorator="['aplication', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="动作">
            <a-input placeholder="请输入动作" v-decorator="['action', validatorRules.action ]" />
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
    name: "FirewallTacticsModal",
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
        firewallTacticsName:{rules: [{ required: true, message: '请输入防火墙策略名称!' }]},
        finrewallNameId:{rules: [{ required: true, message: '请输入防火墙名称!' }]},
        discription:{rules: [{ required: true, message: '请输入描述!' }]},
        sourceSecurityZone:{rules: [{ required: true, message: '请输入源安全区域!' }]},
        destinationSecurityZone:{rules: [{ required: true, message: '请输入目的安全区域!' }]},
        sourceAddress:{rules: [{ required: true, message: '请输入源地址!' }]},
        destinationAddress:{rules: [{ required: true, message: '请输入目的地址!' }]},
        action:{rules: [{ required: true, message: '请输入动作!' }]},
        status:{rules: [{ required: true, message: '请输入状态!' }]},
        },
        url: {
          add: "/cmdb/firewallTactics/add",
          edit: "/cmdb/firewallTactics/edit",
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
          this.form.setFieldsValue(pick(this.model,'firewallTacticsName','finrewallNameId','discription','sourceSecurityZone','destinationSecurityZone','sourceAddress','destinationAddress','user','service','aplication','action','status'))
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