<template>
  <el-dialog title="新建用户" :visible.sync="dialogVisible">
    <el-form ref="userform" :model="userform" :rules="rules">
      <!-- <el-form-item label="账号:" label-width="100px">
        <el-input v-model="userform.user_account" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="姓名:" label-width="100px" prop="user_name">
        <el-input v-model="userform.user_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" label-width="100px" prop="user_password">
        <el-input v-model="userform.user_password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="重复密码:" label-width="100px" prop="reuser_password">
        <el-input v-model="userform.reuser_password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="邮箱:" label-width="100px" prop="user_email">
        <el-input v-model="userform.user_email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { validEmail } from '@/utils/validate'
export default {
  data() {
    const checkUser_email = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('Please input the userEmail'))
      } else if (!validEmail(value)) {
        callback(new Error('Please input the correct email'))
      } else {
        callback()
      }
    }
    const checkUser_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the userName'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (this.userform.user_passowrd.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        if (this.userform.reuser_passowrd !== '') {
          this.$refs.userform.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.userform.user_password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      userform: {
        user_name: '',
        user_password: '',
        reuser_password: '',
        user_email: ''
        // user_account: ''
      },
      form: {
        user_name: '',
        user_password: '',
        user_email: ''
        // user_account: ''
      },
      formLabelWidth: '100px',
      rules: {
        user_password: [{ validator: validatePass, trigger: 'blur' }, { min: 8, max: 12 }],
        reuser_password: [{ validator: validatePass2, trigger: 'blur' }, { min: 8, max: 12 }],
        user_name: [{ validator: checkUser_name, trigger: 'blur' }],
        user_email: [{ validator: checkUser_email, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submit() {
      this.form.user_email = this.userform.user_email
      this.form.user_name = this.userform.user_name
      this.form.user_passowrd = this.userform.user_passowrd
      this.$emit('addUser', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
