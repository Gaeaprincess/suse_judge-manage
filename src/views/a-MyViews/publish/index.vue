<template>
  <div>
    <add-notice
      ref="addNotice"
      @addNotice="addNoticeSubmit"
    />
  </div>
</template>

<script>
// 子组件
import AddNotice from './ChildCpm/addNotice'
// api
import { createNotice } from '@/api/notice'
export default {
  components: {
    AddNotice
  },
  data() {
    return {}
  },
  methods: {
    addNoticeSubmit(noticeInfo) {
      createNotice(noticeInfo).then(res => {
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
