<template>
  <el-dialog title="编辑竞赛" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="收货时间:" label-width="100px">
        <div class="block">
          <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择日期时间"
          />
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import moment from 'moment'
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
      startdate: '',
      starttime: '',
      enddate: '',
      endtime: '',
      form: {
        alter_id: 0,
        start_time: '',
        end_time: '',
        status: ''
      },
      options: [
        {
          value: '-1',
          label: '非比赛中'
        },
        {
          value: '1',
          label: '比赛中'
        }
      ],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.ID
      this.form.start_time = _1.start_time
      this.form.end_time = _1.end_time
      // this.form.status = _1.Status
    }
  },
  // created() {
  //   console.log("111")
  // },
  methods: {
    submit() {
      // console.log(this.ruleform)
      // this.$delete(this.form, 'id')
      // this.$delete(this.form, 'admin_roles')
      this.form.start_time = moment(this.form.start_time).format('YYYY-MM-DD HH:mm:ss')
      this.form.end_time = moment(this.form.end_time).format('YYYY-MM-DD HH:mm:ss')
      this.form.status = parseInt(this.form.status)
      this.$emit('updateContest', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
