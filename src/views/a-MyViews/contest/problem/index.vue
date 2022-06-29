<template>
  <div>
    <problem-list
      :list="showList"
      @search="search"
      @deleteProblem="deleteProblem"
      @updateProblem="updateProblem"
      @deplayContent="deplayContent"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <update-problem
      ref="updateProblem"
      :ruleform="singleData"
      :uid="activeUserId"
      @updateProblem="updateProblemSubmit"
    />
    <deplay-description
      ref="deplayDescription"
      :content="descriptionData"
    />
    <!-- <update-picture
      ref="updatePicture"
      :ruleform="singleData"
      @updatePicture="updatePictureSubmit"
    />
    <deplay-content
      ref="deplayContent"
      :content="contentData"
    /> -->
  </div>
</template>

<script>
// 子组件
import ProblemList from './ChildCpm/problemList'
import Pages from './ChildCpm/pages'
// import DeplayContent from './ChildCpm/deplayContent'
// import UpdateProblem from './ChildCpm/updateProblem'
import UpdateProblem from './ChildCpm/updateProblem'
// api
import {
  getProblemList,
  deleteProblem,
  updateProblem
} from '@/api/problem'
// import { getInfo } from '@/api/user'

export default {
  components: {
    ProblemList,
    Pages,
    UpdateProblem
  },
  data() {
    return {
      singleData: {}, // 修改需要的个人数据
      activePage: 1, // 当前页码
      totalPages: 0, // 总页数
      everyPageShowItemNumber: 4,
      contentData: {},
      descriptionData: [],
      allProblemList: [],
      searchList: [], // 筛选后的数据
      activeUserId: null
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
    // 页面加载前，先请求所有问题列表
    this.getProblemLists()
  },
  methods: {
    search(val) {
      this.searchList = this.allProblemList.filter(data => {
        if (val === '' ||
          data.title.includes(val) ||
          data.content.includes(val) ||
          data.id === parseInt(val) ||
          data.publisher.includes(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },
    // 更新页码
    pageChange(page) {
      this.activePage = page
    },
    // 获取问题列表
    getProblemLists() {
      getProblemList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allProblemList = res
        this.search('')
      })
    },
    // 编辑问题弹出对话框
    updateProblem(item) {
      this.singleData = item
      this.activeUserId = item.id
      this.$refs.updateProblem.dialogVisible = true
      // getInfo().then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 修改问题后点击提交按钮
    updateProblemSubmit(userInfo) {
      updateProblem(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getProblemLists() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    updatePicture(item) {
      this.singleData = item
      this.activeUserId = item.id
      this.$refs.updatePicture.dialogFormVisible = true
    },
    // 修改问题后点击提交按钮
    updatePictureSubmit(userInfo) {
      updatePicture(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getProblemLists()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    deplayContent(item) {
      this.activeUserId = item.id
      this.contentData = item
      this.$refs.deplayContent.dialogVisible = true // 拉起对话框
    },
    // 点击了删除管理员
    deleteProblem(item) {
      // console.log('删除管理员')
      // 先弹出对话框提示是否删除
      this.$confirm('此操作将删除该公告, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // // 如果确定删除，那么就调用api
        // if (item.ID === 1) { // 最高管理员禁止删除
        //   this.$message({
        //     type: 'warning',
        //     message: '最高管理员禁止被删除'
        //   })
        //   return
        // }
        deleteProblem(item).then(res => {
          // console.log(res)
          this.getProblemLists()
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
