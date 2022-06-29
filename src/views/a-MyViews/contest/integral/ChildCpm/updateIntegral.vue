<template>
  <el-dialog title="编辑用户积分" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="总积分值:" label-width="100px">
        <el-input v-model="form.value" autocomplete="off" />
      </el-form-item>
      <el-form-item label="已兑换积分值:" label-width="120px">
        <el-input v-model="form.consumption_value" autocomplete="off" />
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
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        user_id: 0,
        value: '',
        consumption_value: ''
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.user_id = _1.UserID
      this.form.value = _1.Value
      this.form.consumption_value = _1.ConsumptionValue
    }
  },
  // created() {
  //   console.log("111")
  // },
  methods: {
    submit() {
      // this.$delete(this.form, 'id')
      // this.$delete(this.form, 'admin_roles')
      this.form.value = parseInt(this.form.value)
      this.form.consumption_value = parseInt(this.form.consumption_value)
      this.$emit('updateIntegral', this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
