<template>
  <div>
    <carousel-list
      :list="showList"
      @search="search"
      @deleteCarousel="deleteCarousel"
      @addCarousel="addCarousel"
      @updateCarousel="updateCarousel"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <add-carousel
      ref="addCarousel"
      @addCarousel="addCarouselSubmit"
    />
    <update-carousel
      ref="updateCarousel"
      :ruleform="singleData"
      :uid="activeClickUserId"
      @updateCarousel="updateCarouselSubmit"
    />
    <!-- <update-picture
      ref="updatePicture"
      :ruleform="singleData"
      @updatePicture="updatePictureSubmit"
    /> -->
  </div>
</template>

<script>
// api
import {
  getCarouselList,
  updateCarousel,
  deleteCarousel,
  createCarousel
} from '@/api/carousel'
// 子组件
import CarouselList from './ChildCpm/carouselList'
import Pages from './ChildCpm/pages'
import AddCarousel from './ChildCpm/addCarousel'
import UpdateCarousel from './ChildCpm/updateCarousel'
export default {
  components: {
    Pages,
    CarouselList,
    AddCarousel,
    UpdateCarousel
  },
  data() {
    return {
      singleData: {}, // 修改需要的单个数据
      everyPageShowItemNumber: 2, // 每页 8 条数据
      allCarouselList: [], // 所有轮播图的信息
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
    this.getCarouselList() // 初始化所有列表
  },
  methods: {
    // 过滤器
    search(val) {
      this.searchList = this.allCarouselList.filter(data => {
        if (val === '' ||
            data.title.includes(val) ||
            data.ID === parseInt(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },

    // 点击了添加轮播图，我们需要弹出对话框
    addCarousel() {
      this.$refs.addCarousel.dialogFormVisible = true
    },

    // 添加轮播图对话框输入完以后点击了提交按钮的事件
    addCarouselSubmit(userInfo) {
      createCarousel(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getCarouselList() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },

    // 修改轮播图
    updateCarousel(item) {
      this.singleData = item
      this.activeClickUserId = item.ID
      this.$refs.updateCarousel.dialogFormVisible = true
    },
    // 更新轮播图
    updateCarouselSubmit(userInfo) {
      updateCarousel(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getCarouselList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.msg
        })
      })
    },
    // 点击了删除轮播图
    deleteCarousel(item) {
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCarousel(item).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getCarouselList()
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

    // 获取所有轮播图
    getCarouselList() {
      getCarouselList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allCarouselList = res
        // console.log(this.allCarouselList[0])
        this.search('') // 在轮播图初始化之后，就是在 getCarouselList 初始化之后，在进行一个过滤
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
