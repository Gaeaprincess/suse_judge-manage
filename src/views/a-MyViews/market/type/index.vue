<template>
  <div>
    <type-list
      :list="typeList"
      @deleteType="deleteType"
      @addType="addType"
      @updateType="updateType"
    />
    <add-type
      ref="addType"
      @addType="addTypeSubmit"
    />
    <update-type
      ref="updateType"
      :ruleform="singleData"
      :uid="activeUserId"
      @updateType="updateTypeSubmit"
    />

  </div>
</template>

<script>
// 子组件
import TypeList from './ChildCpm/typeList'
import AddType from './ChildCpm/addType'
import UpdateType from './ChildCpm/updateType'
// api
import {
  getTypeList,
  deleteType,
  createType,
  updateType
} from '@/api/type'

export default {
  components: {
    AddType,
    TypeList,
    UpdateType
  },
  data() {
    return {
      singleData: {}, // 修改需要的格人数据
      activeUserId: null,
      typeList: [] // 所有类型列表
    }
  },
  created() {
    // 页面加载前，先请求所有类型列表
    this.getTypeLists()
  },
  methods: {
    // 获取管理员列表
    getTypeLists() {
      getTypeList().then(res => {
        this.typeList = res
      })
    },
    // 在表头点击了添加类型，我们需要弹出对话框
    addType() {
      this.$refs.addType.dialogVisible = true
    },
    updateType(item) {
      this.singleData = item
      this.activeUserId = item.id
      this.$refs.updateType.dialogVisible = true
    },
    // 添加类型对话框输入完以后点击了提交按钮的事件
    addTypeSubmit(userInfo) {
      createType(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getTypeLists() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 修改类型后点击提交按钮
    updateTypeSubmit(userInfo) {
      updateType(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getTypeLists() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 点击了删除类型
    deleteType(item) {
      // 先弹出对话框提示是否删除
      this.$confirm('此操作将删除该类型, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteType(item).then(res => {
          // console.log(res)
          this.getTypeLists()
          this.$message({
            type: 'success',
            message: res.msg
          })
        }).catch(err => {
          // 删除失败就提示类型
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
