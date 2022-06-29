<template>
  <el-dialog title="编辑图片" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="图片" label-width="100px">
        <upload ref="upload" @onChange="onChange" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import upload from './upload'
// import { getAdminList } from '@/api/admin'
export default {
  components: {
    upload
  },
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
      dialogFormVisible: false,
      file: [],
      form: {
        alter_id: 0,
        title: '',
        picture: ''
      },
      // adminList: [],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.id
      this.form.title = _1.title
      // this.form.content = _1.content
      // this.form.picture = _1.picture
    }
  },
  methods: {
    onChange(_file, fileList) {
      // console.log('1')
      this.file = _file
    },
    submit() {
      // this.form.alert_id = this.uid
      this.form.picture = this.file[0].raw
      this.$emit('updatePicture', this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
