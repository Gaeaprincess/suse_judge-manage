<template>
  <el-dialog title="新建类型" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="类型:" label-width="100px">
        <el-input v-model="form.content" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        content: ''
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    submit() {
      this.$emit('addType', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
