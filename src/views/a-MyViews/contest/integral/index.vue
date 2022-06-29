<template>
  <div>
    <integral-list
      :list="showList"
      @search="search"
      @updateIntegral="updateIntegral"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <update-integral
      ref="updateIntegral"
      :ruleform="singleData"
      :uid="activeClickUserId"
      @updateIntegral="updateIntegralSubmit"
    />
  </div>
</template>

<script>
// api
import {
  updateIntegral,
  getIntegralList
} from '@/api/integral'
// 子组件
import IntegralList from './ChildCpm/integralList'
import Pages from './ChildCpm/pages'
import UpdateIntegral from './ChildCpm/updateIntegral'
import { getUserInfoList } from '@/api/userList'
export default {
  components: {
    IntegralList,
    Pages,
    UpdateIntegral
  },
  data() {
    return {
      singleData: {}, // 修改需要的格人数据
      everyPageShowItemNumber: 8, // 每页 8 条数据
      allIntegralList: [], // 所有用户积分的信息
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
    this.getIntegralList() // 初始化所有列表
  },
  methods: {
    // 过滤器
    search(val) {
      this.searchList = this.allIntegralList.filter(data => {
        if (val === '' ||
            // data.Value.includes(val) ||
            // data.ConsumptionValue.includes(val) ||
            data.username.includes(val)
            // data.ID === parseInt(val)
        ) return true
        return false
      })
      // 过滤完以后更新 下面的 条数
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },

    // 点击了修改积分
    updateIntegral(item) {
      this.singleData = item
      this.activeClickUserId = item.ID
      this.$refs.updateIntegral.dialogFormVisible = true
    },
    // 更新用户积分
    updateIntegralSubmit(userInfo) {
      updateIntegral(userInfo).then(res => {
        this.getIntegralList()
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

    // 更新页码
    pageChange(page) {
      this.activePage = page
    },

    // 获取所有用户积分
    getIntegralList() {
      getIntegralList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allIntegralList = res
        getUserInfoList().then(res => {
          for (let i = 0; i < this.allIntegralList.length; i++) {
            var date = new Date(this.allIntegralList[i].UpdatedAt).toJSON()
            this.allIntegralList[i].UpdatedAt = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            for (let j = 0; j < res.length; j++) {
              if (this.allIntegralList[i].UserID === res[j].id) {
                this.allIntegralList[i].username = res[j].user_name
              }
            }
          }
        })
        this.search('') // 在用户积分初始化之后，就是在 getIntegralList 初始化之后，在进行一个过滤
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
