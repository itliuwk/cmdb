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
            label="集群名称">
            <a-input placeholder="请输入集群名称" v-decorator="['clusterName', validatorRules.clusterName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群类型">
            <a-input placeholder="请输入集群类型" v-decorator="['clusterType', validatorRules.clusterType ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群方式">
            <a-input placeholder="请输入集群方式" v-decorator="['clusterWay', validatorRules.clusterWay ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群模式">
            <a-input placeholder="请输入集群模式" v-decorator="['clusterPatten', validatorRules.clusterPatten ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群服务IP">
            <a-input placeholder="请输入集群服务IP" v-decorator="['ipId', validatorRules.ipId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群服务端口">
            <a-input placeholder="请输入集群服务端口" v-decorator="['clusterServicePort', validatorRules.clusterServicePort ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="HA功能是否开启">
            <a-input placeholder="请输入HA功能是否开启" v-decorator="['openHa', validatorRules.openHa ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="failOver功能是否开启">
            <a-input placeholder="请输入failOver功能是否开启" v-decorator="['openFailOver', validatorRules.openFailOver ]" />
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
    name: "ApplicationClusterModal",
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
        clusterName:{rules: [{ required: true, message: '请输入集群名称!' }]},
        clusterType:{rules: [{ required: true, message: '请输入集群类型!' }]},
        clusterWay:{rules: [{ required: true, message: '请输入集群方式!' }]},
        clusterPatten:{rules: [{ required: true, message: '请输入集群模式!' }]},
        ipId:{rules: [{ required: true, message: '请输入集群服务IP!' }]},
        clusterServicePort:{rules: [{ required: true, message: '请输入集群服务端口!' }]},
        openHa:{rules: [{ required: true, message: '请输入HA功能是否开启!' }]},
        openFailOver:{rules: [{ required: true, message: '请输入failOver功能是否开启!' }]},
        },
        url: {
          add: "/cmdb/applicationCluster/add",
          edit: "/cmdb/applicationCluster/edit",
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
          this.form.setFieldsValue(pick(this.model,'clusterName','clusterType','clusterWay','clusterPatten','ipId','clusterServicePort','openHa','openFailOver'))
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