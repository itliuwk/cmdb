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
          <a-form-model-item label="设备名称" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="电流(A)">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="序列号" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="维保时间">
            <a-range-picker style="width: 100%;"
                            v-model="form.date1"
                            show-time
                            type="date">
            </a-range-picker>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="扩展柜序列号" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="维保服务商">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="型号" prop="type">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地理位置">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="维保服务商">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item ref="name" label="机房">
            <a-select v-model="form.region" placeholder="请选择">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span=12>
          <a-form-model-item ref="name" label="微码版本" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
        <a-col :span=12>
          <a-form-model-item ref="name" label="U位" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="管理IP" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="磁盘数量" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="存储裸容量（GB）" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="存储可用容量（GB）" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="存储剩余容量（GB）" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="U高" prop="region">
            <a-input v-model="form.name" placeholder="请输入" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="额定功率（KW）" prop="name">
            <a-input v-model="form.name" placeholder="请输入" />
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
      labelCol: { span: 10 },
      wrapperCol: { span: 12 },
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
