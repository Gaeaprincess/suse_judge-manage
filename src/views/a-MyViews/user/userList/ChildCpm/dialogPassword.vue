<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="密码" label-width="120px" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" label-width="120px" prop="checkPassword">
        <el-input v-model="form.checkPassword" type="password" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="surePasswordClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    ruleform: {
      type: Object,
      default() {
        return {}
      }
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        password: '',
        checkPassword: ''
      },
      userform: {
        alter_id: 0,
        user_account: '',
        password: '',
        email: '',
        user_name: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.userform.alter_id = _1.id
      this.userform.user_account = _1.user_account
      this.userform.user_name = _1.user_name
      this.userform.email = _1.eamil
      this.userform.password = _1.password
    }
  },
  methods: {
    surePasswordClick() {
      if ((this.form.password === this.form.checkPassword) && this.form.password !== '') {
        this.dialogFormVisible = false
        this.userform.password = this.form.password
        this.$emit('surePasswordClick', this.userform)
      } else this.dialogFormVisible = true
    }
  }
}
</script>

<style scoped>

</style>
