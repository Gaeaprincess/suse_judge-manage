<template>
  <div>
    <add-contest
      ref="addContest"
      @addContest="addContest"
    />
  </div>
</template>

<script>
// 子组件
import AddContest from './ChildCpm/addContest'
// api
import { addContest } from '@/api/contest'
export default {
  components: {
    AddContest
  },
  data() {
    return {}
  },
  methods: {
    // 添加竞赛
    addContest(noticeInfo) {
      addContest(noticeInfo).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
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
