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
            label="数据库名称">
            <a-input placeholder="请输入数据库名称" v-decorator="['databaseName', validatorRules.databaseName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库服务名">
            <a-input placeholder="请输入数据库服务名" v-decorator="['serviceName', validatorRules.serviceName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库实例名称">
            <a-input placeholder="请输入数据库实例名称" v-decorator="['instanceName', validatorRules.instanceName ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="Vip">
            <a-input placeholder="请输入Vip" v-decorator="['vipId', validatorRules.vipId ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="其他IP">
            <a-input placeholder="请输入其他IP" v-decorator="['otherIpId', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库监听端口">
            <a-input placeholder="请输入数据库监听端口" v-decorator="['monitorPort', validatorRules.monitorPort ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库版本号">
            <a-input placeholder="请输入数据库版本号" v-decorator="['version', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库类型">
            <a-input placeholder="请输入数据库类型" v-decorator="['databaseType', validatorRules.databaseType ]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="安装某个虚拟机">
            <a-input placeholder="请输入安装某个虚拟机" v-decorator="['virtualMachineId', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="安装某个物理机">
            <a-input placeholder="请输入安装某个物理机" v-decorator="['physicalMachineId', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="数据库补丁号">
            <a-input placeholder="请输入数据库补丁号" v-decorator="['patchNo', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="对应的容灾Ci">
            <a-input placeholder="请输入对应的容灾Ci" v-decorator="['disasterRecoveryCi', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="是否双活">
            <a-input placeholder="请输入是否双活" v-decorator="['doubleActive', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="集群节点性质">
            <a-input placeholder="请输入集群节点性质" v-decorator="['nodeNature', {}]" />
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="属于某个集群">
            <a-input placeholder="请输入属于某个集群" v-decorator="['clusterId', {}]" />
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
    name: "DatabaseInstanceModal",
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
        databaseName:{rules: [{ required: true, message: '请输入数据库名称!' }]},
        serviceName:{rules: [{ required: true, message: '请输入数据库服务名!' }]},
        instanceName:{rules: [{ required: true, message: '请输入数据库实例名称!' }]},
        vipId:{rules: [{ required: true, message: '请输入Vip!' }]},
        monitorPort:{rules: [{ required: true, message: '请输入数据库监听端口!' }]},
        databaseType:{rules: [{ required: true, message: '请输入数据库类型!' }]},
        },
        url: {
          add: "/cmdb/databaseInstance/add",
          edit: "/cmdb/databaseInstance/edit",
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
          this.form.setFieldsValue(pick(this.model,'databaseName','serviceName','instanceName','vipId','otherIpId','monitorPort','version','databaseType','virtualMachineId','physicalMachineId','patchNo','disasterRecoveryCi','doubleActive','nodeNature','clusterId'))
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