<template>
  <div class="form-control">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-row>
        <a-col :span="24">
          <a-form-model-item ref="name" label="设光纤交换机名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入设光纤交换机名称" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item ref="name" label="zone名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入zone名称" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item label="端口名称" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="2">2G</a-select-option>
              <a-select-option value="4">4G</a-select-option>
              <a-select-option value="8">8G</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item ref="name" label="配置文件名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入配置文件名称" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item label="状态" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="1">启用</a-select-option>
              <a-select-option value="2">不启用</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 },
      other: '',
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
      },
    }
  },
  methods: {
    onSubmit() {
      let that = this
      return new Promise(function (reslove, reject) {
        that.$refs.ruleForm.validate((valid) => {
          if (valid) {
            reslove({ is: true, form: that.form })
          } else {
            reslove({ is: false })
            return false
          }
        })
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
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
