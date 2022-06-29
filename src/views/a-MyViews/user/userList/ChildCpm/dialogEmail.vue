<template>
  <el-dialog title="请输入邮箱" :visible.sync="dialogFormVisible">
    <el-form>
      <el-form-item label="邮箱" label-width="120px">
        <el-input v-model="email" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureEmailClick">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      email: ''
    }
  },
  methods: {
    sureEmailClick() {
      this.dialogFormVisible = false
      this.$emit('sureEmailClick', this.email)
    }
  }
}
</script>

<style scoped>

</style>
