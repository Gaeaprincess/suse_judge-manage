<template>
  <div>
    <user-list
      :list="showList"
      @search="search"
      @modifyInfoClick="modifyInfoClick"
      @deleteUserClick="deleteUserClick"
      @addUser="addUser"
      @modifyEmailClick="modifyEmailClick"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <add-user
      ref="addUser"
      @addUser="addUserSubmit"
    />
    <dialog-email
      ref="email"
      @sureEmailClick="sureEmailClick"
    />
    <dialog-password
      ref="password"
      :ruleform="singleData"
      :uid="activeClickUserId"
      @surePasswordClick="surePasswordClick"
    />
  </div>
</template>

<script>
// api
import {
  getUserInfoList,
  updataUserEmail,
  deleteUser,
  createUser,
  updataUserPassword
} from '@/api/userList'
// 子组件
import userList from './ChildCpm/userList'
import Pages from './ChildCpm/pages'
import AddUser from './ChildCpm/addUser'
import DialogEmail from './ChildCpm/dialogEmail'
import DialogPassword from './ChildCpm/dialogPassword'
export default {
  components: {
    AddUser,
    userList,
    Pages,
    DialogEmail,
    DialogPassword
  },
  data() {
    return {
      singleData: {}, // 修改需要的格人数据
      everyPageShowItemNumber: 8, // 每页 8 条数据
      allUserList: [], // 所有用户的信息
      totalPages: 0, // 总页数
      activePage: 1, // 当前页码
      searchList: [], // 筛选后的数据
      activeClickUserId: null
    }
  },
  computed: {
    showList() { // 展示的数据（最多只有20条）
      return this.searchList.slice(
        (this.activePage - 1) * this.everyPageShowItemNumber, // 开始位置
        (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber // 结束位置
      )
    }
  },
  created() {
    this.getuserList() // 初始化所有列表
  },
  methods: {
    // 过滤器
    search(val) {
      this.searchList = this.allUserList.filter(data => {
        if (val === '' ||
            data.user_name.includes(val) ||
            data.user_email.includes(val) ||
            data.id === parseInt(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },

    // 在表头点击了添加用户，我们需要弹出对话框
    addUser() {
      this.$refs.addUser.dialogVisible = true
    },

    // 添加用户对话框输入完以后点击了提交按钮的事件
    addUserSubmit(userInfo) {
      createUser(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getuserList() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },

    // 点击了修改邮箱
    modifyEmailClick(item) {
      this.activeClickUserId = item.id
      // 弹出对话框
      this.$refs.email.dialogFormVisible = true
    },
    // 确认邮箱后
    sureEmailClick(email) {
      updataUserEmail(this.activeClickUserId, email).then(res => {
        this.getuserList()
      })
    },

    // 点击了修改用户密码
    modifyInfoClick(item) {
      this.singleData = item
      this.activeClickUserId = item.id
      this.$refs.password.dialogFormVisible = true
    },
    // 更新用户密码
    surePasswordClick(userInfo) {
      updataUserPassword(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: err.msg
        })
      })
    },

    // 点击了删除用户
    deleteUserClick(item) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(item).then(res => {
          this.getuserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 更新页码
    pageChange(page) {
      this.activePage = page
    },

    // 获取所有用户
    getuserList() {
      getUserInfoList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allUserList = res
        this.search('') // 在用户初始化之后，就是在 allUserList 初始化之后，在进行一个过滤
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
