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
        <a-col :span="12">
          <a-form-model-item ref="name" label="设备名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入设备名称" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="动作" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="策略名" prop="name">
            <a-input v-model="form.name" placeholder="请输入策略名" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="状态" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="源安全区域" prop="name">
            <a-input v-model="form.name" placeholder="请输入源安全区域" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="目的安全区域" prop="name">
            <a-input v-model="form.name" placeholder="请输入目的安全区域" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="源地址" prop="name">
            <a-input v-model="form.name" placeholder="请输入源地址" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="目的地址" prop="name">
            <a-input v-model="form.name" placeholder="请输入目的地址" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="用户" prop="name">
            <a-input v-model="form.name" placeholder="请输入用户" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="服务" prop="name">
            <a-input v-model="form.name" placeholder="请输入服务" />
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
      wrapperCol: { span: 14 },
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
