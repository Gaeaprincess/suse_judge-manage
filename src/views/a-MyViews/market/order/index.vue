<template>
  <div>
    <order-list
      :list="showList"
      @search="search"
      @updateOrder="updateOrdersubmit"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <!-- <update-order
      ref="updateOrder"
      :ruleform="singleData"
      @updateOrder="updateOrdersubmit"
    /> -->
  </div>
</template>

<script>
// api
import moment from 'moment'
import {
  getOrderList,
  updateOrder
} from '@/api/order'
import { getUserInfoList } from '@/api/userList'
import { getGoodsList } from '@/api/goods'
// 子组件
import OrderList from './ChildCpm/orderList'
import Pages from './ChildCpm/pages'
// import UpdateOrder from './ChildCpm/updateOrder'
export default {
  components: {
    Pages,
    OrderList
    // UpdateOrder
  },
  data() {
    return {
      everyPageShowItemNumber: 4, // 每页 8 条数据
      updateForm: {
        order_id: 0,
        get_time: ''
      },
      allOrderList: [], // 所有订单的信息
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
    this.getorderList() // 初始化所有列表
  },
  methods: {
    // 过滤器
    search(val) {
      this.searchList = this.allOrderList.filter(data => {
        if (val === '' ||
            data.UserID.includes(val) ||
            data.GoodsID.includes(val) ||
            data.status === parseInt(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },
    // 更新用户密码
    updateOrdersubmit(userInfo) {
      this.updateForm.order_id = userInfo.ID
      this.updateForm.get_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      updateOrder(this.updateForm).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.getorderList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    // 更新页码
    pageChange(page) {
      this.activePage = page
    },

    // 获取所有订单
    getorderList() {
      getOrderList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allOrderList = res
        for (let i = 0; i < this.allOrderList.length; i++) {
          this.allOrderList[i].CreatedAt = moment(this.allOrderList[i].CreatedAt).format('YYYY-MM-DD HH:MM:SS')
          if (this.allOrderList[i].GetTime === '0001-01-01T00:00:00Z') {
            this.allOrderList[i].GetTime = '未取货'
          }
          var date = new Date(this.allOrderList[i].GetTime).toJSON()
          this.allOrderList[i].GetTime = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        }
        getUserInfoList().then(res => {
          for (let i = 0; i < this.allOrderList.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (this.allOrderList[i].UserID === res[j].id) {
                this.allOrderList[i].UserID = res[j].user_name
              }
            }
          }
        })
        getGoodsList().then(res => {
          for (let i = 0; i < this.allOrderList.length; i++) {
            for (let j = 0; j < res.length; j++) {
              if (this.allOrderList[i].GoodsID === res[j].id) {
                this.allOrderList[i].GoodsID = res[j].goods_name
              }
            }
          }
        })
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
