<template>
  <el-dialog title="编辑样例" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="输入:" label-width="100px">
        <mavon-editor v-model="form.input" />
      </el-form-item>
      <el-form-item label="输出:" label-width="100px">
        <mavon-editor v-model="form.output" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    ruleform: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        alter_id: 0,
        input: '',
        output: ''
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      // console.log(_1)
      this.form.alter_id = _1.ID
      this.form.input = _1.Input
      this.form.output = _1.Output
    }
  },
  methods: {
    submit() {
      this.$emit('updateExample', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
