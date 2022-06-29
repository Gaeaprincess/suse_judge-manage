<template>
  <div>
    <goods-list
      :list="showList"
      @search="search"
      @deleteGoods="deleteGoods"
      @addGoods="addGoods"
      @updateGoods="updateGoods"
      @updatePicture="updatePicture"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <add-goods
      ref="addGoods"
      @addGoods="addGoodsSubmit"
    />
    <update-goods
      ref="updateGoods"
      :ruleform="singleData"
      :uid="activeClickUserId"
      @updateGoods="updateGoodsSubmit"
    />
    <update-picture
      ref="updatePicture"
      :ruleform="singleData"
      @updatePicture="updatePictureSubmit"
    />
  </div>
</template>

<script>
// api
import {
  getGoodsList,
  updateGoods,
  deleteGoods,
  createGoods,
  updatePicture
} from '@/api/goods'
// 子组件
import GoodsList from './ChildCpm/goodsList'
import Pages from './ChildCpm/pages'
import AddGoods from './ChildCpm/addGoods'
import UpdateGoods from './ChildCpm/updateGoods'
import UpdatePicture from './ChildCpm/updatePicture'
export default {
  components: {
    AddGoods,
    GoodsList,
    Pages,
    UpdateGoods,
    UpdatePicture
  },
  data() {
    return {
      singleData: {}, // 修改需要的格人数据
      everyPageShowItemNumber: 5, // 每页 8 条数据
      allGoodsList: [], // 所有商品的信息
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
    this.getGoodsList() // 初始化所有列表
  },
  methods: {
    // 过滤器
    search(val) {
      this.searchList = this.allGoodsList.filter(data => {
        if (val === '' ||
            data.goods_name.includes(val) ||
            data.goods_type.includes(val) ||
            data.goods_description.includes(val) ||
            data.id === parseInt(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },

    // 在表头点击了添加商品，我们需要弹出对话框
    addGoods() {
      this.$refs.addGoods.dialogVisible = true
    },

    // 添加商品对话框输入完以后点击了提交按钮的事件
    addGoodsSubmit(userInfo) {
      createGoods(userInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getGoodsList() // 刷新列表
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },

    // 修改商品
    updateGoods(item) {
      this.singleData = item
      this.activeClickUserId = item.id
      this.$refs.updateGoods.dialogVisible = true
    },
    // 更新商品
    updateGoodsSubmit(userInfo) {
      updateGoods(userInfo).then(res => {
        this.getGoodsList()
        this.$message({
          type: 'success',
          message: res
        })
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.msg
        })
      })
    },
    // 修改图片
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
        this.getGoodsList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },

    // 点击了删除商品
    deleteGoods(item) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(item).then(res => {
          this.getGoodsList()
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
    getGoodsList() {
      getGoodsList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allGoodsList = res
        // console.log(this.allGoodsList[0])
        this.search('')
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
