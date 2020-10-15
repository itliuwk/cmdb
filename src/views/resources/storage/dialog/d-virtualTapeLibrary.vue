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
          <a-form-model-item label="额定功率（KW）" prop>
            <a-input v-model="form.name" placeholder="请输入额定功率（KW）" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="序列号" prop="name">
            <a-input v-model="form.name" placeholder="请输入序列号" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="维保时间" required prop="date1">
            <a-range-picker v-model="form.date1" style="width: 100%;" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="型号" prop="name">
            <a-input v-model="form.name" placeholder="请输入型号" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="维保服务商" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="制造商" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item ref="name" label="地理位置" prop>
            <a-input v-model="form.name" placeholder="请输入地理位置" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="微码版本" prop="name">
            <a-input v-model="form.name" placeholder="请输入OS版本" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item ref="name" label="机房" prop="name">
            <a-input v-model="form.name" placeholder="请输入机房" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="管理IP" prop="name">
            <a-input v-model="form.name" placeholder="请输入管理IP" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="机柜" prop="region">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="驱动器数量" prop="name">
            <a-input v-model="form.name" placeholder="请输入驱动器数量" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item ref="name" label="U高" prop="name">
            <a-input v-model="form.name" placeholder="请输入U高" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="驱动器型号" prop="name">
            <a-input v-model="form.name" placeholder="请输入驱动器型号" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="驱动器序列号" prop="name">
            <a-input v-model="form.name" placeholder="请输入驱动器序列号" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="驱动器微码" prop="name">
            <a-input v-model="form.name" placeholder="请输入驱动器微码" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="磁盘数量" prop="name">
            <a-input v-model="form.name" placeholder="请输入磁盘数量" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item ref="name" label="U高" prop="name">
            <a-input v-model="form.name" placeholder="请输入U高" />
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
      labelCol: { span: 6 },
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
