<template>
  <el-dialog title="编辑管理员" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="账号:" label-width="100px">
        <el-input v-model="form.admin_account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名:" label-width="100px">
        <el-input v-model="form.admin_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" label-width="100px">
        <el-input v-model="form.password" autocomplete="off" type="password" />
      </el-form-item>
      <el-form-item label="角色:" label-width="100px">
        <el-select v-model="form.roles" placeholder="请选择管理员角色">
          <el-option v-for="item in options" :key="item.content" :label="item.content" :value="item.content" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 获取角色
import { getRole } from '@/api/adminrole'
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
    return {
      dialogVisible: false,
      form: {
        alter_id: 0,
        admin_account: '',
        password: '',
        roles: '',
        admin_name: ''
      },
      options: [],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.id
      this.form.admin_account = _1.admin_account
      this.form.admin_name = _1.admin_name
      this.form.roles = _1.admin_roles
      this.form.password = _1.password
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色
    getRoleList() {
      getRole().then(res => {
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 提交表单
    submit() {
      this.form.alert_id = this.uid
      this.$emit('updateAdmin', this.form)
      this.form = {}
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
