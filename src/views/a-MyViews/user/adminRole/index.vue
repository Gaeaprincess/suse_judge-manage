<template>
  <div>
    <admin-list
      :list="adminList"
      @deleteAdmin="deleteAdmin"
      @addAdmin="addAdmin"
      @updateAdmin="updateAdmin"
    />
    <add-admin
      ref="addAdmin"
      @addAdmin="addAdminSubmit"
    />
    <update-admin
      ref="updateAdmin"
      :ruleform="singleData"
      :uid="activeUserId"
      @updateAdmin="updateAdminSubmit"
    />

  </div>
</template>

<script>
// 子组件
import AdminList from './ChildCpm/adminList'
import AddAdmin from './ChildCpm/addAdmin'
import UpdateAdmin from './ChildCpm/updateAdmin'
// api
import {
  getAdminList,
  deleteAdmin,
  createAdmin,
  updateAdmin
} from '@/api/admin'

export default {
  components: {
    AddAdmin,
    AdminList,
    UpdateAdmin
  },
  data() {
    return {
      singleData: {}, // 修改需要的个人数据
      adminList: [], // 所有管理员列表
      activeUserId: null // 当前点击的用户的 id，用于删除等
    }
  },
  created() {
    // 页面加载前，先请求所有管理员列表
    this.getAdminLists()
  },
  methods: {
    // 获取管理员列表
    getAdminLists() {
      getAdminList().then(res => {
        this.adminList = res
      })
    },
    // 在表头点击了添加管理员，我们需要弹出对话框
    addAdmin() {
      this.$refs.addAdmin.dialogVisible = true
    },
    // 更新管理员
    updateAdmin(item) {
      this.singleData = item
      this.activeUserId = item.id
      // console.log(this.singleData)
      // console.log(this.activeUserId)
      this.$refs.updateAdmin.dialogVisible = true
    },
    // 添加管理员对话框输入完以后点击了提交按钮的事件
    addAdminSubmit(userInfo) {
      createAdmin(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getAdminLists() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 修改管理员后点击提交按钮
    updateAdminSubmit(userInfo) {
      updateAdmin(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getAdminLists() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 点击了删除管理员
    deleteAdmin(item) {
      // 先弹出对话框提示是否删除
      this.$confirm('此操作将删除该管理员, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 如果确定删除，那么就调用api
        if (item.ID === 1) { // 最高管理员禁止删除
          this.$message({
            type: 'warning',
            message: '最高管理员禁止被删除'
          })
          return
        }
        deleteAdmin(item).then(res => {
          this.getAdminLists()
          this.$message({
            type: 'success',
            message: res.msg
          })
        }).catch(err => {
          // 删除失败就提示用户
          this.$message({
            type: 'warning',
            message: err
          })
        })
      }).catch(() => {
        // 取消提示已取消
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
