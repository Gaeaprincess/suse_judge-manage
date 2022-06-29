<template>
  <el-dialog title="新建管理员" :visible.sync="dialogVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="账号:" label-width="100px" prop="admin_account">
        <el-input v-model="form.admin_account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名:" label-width="100px" prop="admin_name">
        <el-input v-model="form.admin_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" label-width="100px" prop="password">
        <el-input v-model="form.password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item
        label="重复密码:"
        label-width="100px"
        prop="repassword"
      >
        <el-input v-model="form.repassword" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="角色:" label-width="100px">
        <el-select v-model="form.roles" placeholder="请选择管理员权限">
          <el-option v-for="item in options" :key="item.content" :label="item.content" :value="item.content" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRole } from '@/api/adminrole'
export default {
  data() {
    const checkAdmin_account = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the adminAccount'))
      } else {
        callback()
      }
    }
    const checkAdmin_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the adminName'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (this.form.password.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        if (this.form.repassword !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      form: {
        admin_account: '',
        password: '',
        repassword: '',
        roles: '',
        admin_name: ''
      },
      ruleform: {
        admin_account: '',
        password: '',
        roles: '',
        admin_name: ''
      },
      options: [],
      formLabelWidth: '100px',
      rules: {
        password: [{ validator: validatePass, trigger: 'blur' }, { min: 8, max: 12 }],
        repassword: [{ validator: validatePass2, trigger: 'blur' }, { min: 8, max: 12 }],
        admin_name: [{ validator: checkAdmin_name, trigger: 'blur' }],
        admin_account: [{ validator: checkAdmin_account, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      getRole().then(res => {
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    submit() {
      this.ruleform.admin_name = this.form.admin_name
      this.ruleform.admin_account = this.form.admin_account
      this.ruleform.password = this.form.password
      this.ruleform.roles = this.form.roles
      this.$emit('addAdmin', this.ruleform)
      this.dialogVisible = false
      this.form = {}
    },
    cancel() {
      this.dialogVisible = false
      this.form = {}
    }
  }
}
</script>

<style scoped>

</style>
