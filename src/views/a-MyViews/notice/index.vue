<template>
  <div>
    <notice-list
      :list="showList"
      @search="search"
      @deleteNotice="deleteNotice"
      @updatePicture="updatePicture"
      @updateNotice="updateNotice"
      @deplayContent="deplayContent"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <update-notice
      ref="updateNotice"
      :ruleform="singleData"
      :uid="activeUserId"
      @updateNotice="updateNoticeSubmit"
    />
    <update-picture
      ref="updatePicture"
      :ruleform="singleData"
      @updatePicture="updatePictureSubmit"
    />
    <deplay-content
      ref="deplayContent"
      :content="contentData"
    />
  </div>
</template>

<script>
// 子组件
import NoticeList from './ChildCpm/noticeList'
import Pages from './ChildCpm/pages'
import moment from 'moment'
import DeplayContent from './ChildCpm/deplayContent'
import UpdateNotice from './ChildCpm/updateNotice'
import UpdatePicture from './ChildCpm/updatePicture'
// api
import {
  getNoticeList,
  deleteNotice,
  updateNotice,
  updatePicture
} from '@/api/notice'

export default {
  components: {
    DeplayContent,
    NoticeList,
    Pages,
    UpdateNotice,
    UpdatePicture
  },
  data() {
    return {
      singleData: {}, // 修改需要的个人数据
      activePage: 1, // 当前页码
      totalPages: 0, // 总页数
      everyPageShowItemNumber: 4, // 每页 8 条数据
      contentData: {}, // 公告内容
      allNoticeList: [], // 所有公告列表
      activeUserId: null,
      searchList: [] // 筛选后的数据
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
    // 页面加载前，先请求所有管理员列表
    this.getNoticeLists()
  },
  methods: {
    search(val) {
      this.searchList = this.allNoticeList.filter(data => {
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
    // 获取公告列表
    getNoticeLists() {
      getNoticeList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allNoticeList = res
        for (let i = 0; i < this.allNoticeList.length; i++) {
          this.allNoticeList[i].create_at = moment(this.allNoticeList[i].create_at).format('YYYY-MM-DD HH:MM:SS')
        }
        this.search('')
      })
    },
    // 编辑公告弹出对话框
    updateNotice(item) {
      this.singleData = item
      this.activeUserId = item.id
      this.$refs.updateNotice.dialogVisible = true
    },
    // 修改公告后点击提交按钮
    updateNoticeSubmit(userInfo) {
      updateNotice(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getNoticeLists() // 刷新列表
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
      // getInfo().then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 修改管理员后点击提交按钮
    updatePictureSubmit(userInfo) {
      updatePicture(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getNoticeLists()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    deplayContent(item) {
      this.activeUserId = item.id // 保存当前用户信息
      this.contentData = item
      this.$refs.deplayContent.dialogVisible = true // 拉起对话框
    },
    // 点击了删除公告
    deleteNotice(item) {
      // 先弹出对话框提示是否删除
      this.$confirm('此操作将删除该公告, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNotice(item).then(res => {
          // console.log(res)
          this.getNoticeLists()
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
