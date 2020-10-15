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
          <a-form-model-item label="类型" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item ref="name" label="序列号" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item ref="name" label="刀片容量" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item label="U数" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item label="U位" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <a-form-model-item label="功率">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item label="机柜">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item label="刀箱管理IP" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item label="维保日期" prop="name">
            <a-range-picker style="width: 100%;"
            v-model="form.date1"
            show-time
            type="date">
            </a-range-picker>
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
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [{ required: true, message: 'Please select activity resource', trigger: 'change' }],
        desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onSubmit() {
      let that = this
      return new Promise(function(reslove, reject) {
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
    }
  }
}
</script>

<style lang="less" scoped>
.form-control {
  max-height: 650px;
  overflow: auto;
}
</style>
