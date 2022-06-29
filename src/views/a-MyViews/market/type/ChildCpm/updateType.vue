<template>
  <el-dialog title="编辑类型" :visible.sync="dialogVisible">
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
  props: {
    ruleform: {
      type: Object,
      default() {
        return {}
      }
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        alter_id: 0,
        content: ''
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.id
      this.form.content = _1.content
    }
  },
  methods: {
    submit() {
      this.form.alert_id = this.uid
      // this.$delete(this.form, 'id')
      // this.$delete(this.form, 'admin_roles')
      this.$emit('updateType', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
