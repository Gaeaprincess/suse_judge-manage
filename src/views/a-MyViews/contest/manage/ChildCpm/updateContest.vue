<template>
  <el-dialog title="编辑竞赛" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="开始时间:" label-width="100px">
        <div class="block">
          <el-date-picker
            v-model="form.start_time"
            type="datetime"
            placeholder="选择日期时间"
          />
        </div>
      </el-form-item>
      <el-form-item label="结束时间:" label-width="100px">
        <div class="block">
          <el-date-picker
            v-model="form.end_time"
            type="datetime"
            placeholder="选择日期时间"
          />
        </div>
      </el-form-item>
      <el-form-item label="开放状态:" label-width="100px">
        <el-select v-model="value" placeholder="请选择状态" @change="changeValue">
          <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="status" label="密码:" label-width="100px">
        <el-input v-model="form.password" style="width: 50%;" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="竞赛状态:" label-width="100px">
        <el-select v-model="form.status" placeholder="修改比赛状态">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
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
      value: '',
      status: false,
      option: [
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Private',
          value: 'Private'
        }
      ],
      dialogVisible: false,
      startdate: '',
      starttime: '',
      enddate: '',
      endtime: '',
      form: {
        alter_id: 0,
        password: '',
        start_time: '',
        end_time: '',
        status: ''
      },
      options: [
        {
          value: '-1',
          label: '用户不可见'
        },
        {
          value: '1',
          label: '用户可见'
        }
      ],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.password = _1.Password
      this.form.alter_id = _1.ID
      this.form.start_time = _1.StartTime
      this.form.end_time = _1.EndTime
      this.form.status = _1.Status
      if (this.form.password === '') {
        this.value = 'Public'
      } else {
        this.value = 'Private'
      }
      if (this.form.status === -1) {
        this.form.status = '用户不可见'
      } else {
        this.form.status = '用户可见'
      }
      this.changeValue(this.value)
      // this.form.status = _1.Status
    }
  },
  // created() {
  //   console.log("111")
  // },
  methods: {
    changeValue(item) {
      if (item === 'Private') {
        this.status = true
      } else {
        this.status = false
      }
    },
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
