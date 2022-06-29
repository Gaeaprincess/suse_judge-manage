<template>
  <el-dialog title="编辑轮播图" :visible.sync="dialogFormVisible">
    <el-form :model="form" style="margin-top: 40px">
      <el-form-item label="图片" label-width="100px">
        <upload ref="upload" @onChange="onChange" />
      </el-form-item>
      <el-form-item align="center">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import upload from './upload'
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
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      file: [],
      form: {
        alert_id: '',
        title: '',
        picture: ''
      }
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.ID
      this.form.title = _1.title
      this.form.picture = _1.picture
    }
  },
  methods: {
    onChange(_file) {
      this.file = _file
    },
    submit() {
      this.form.picture = this.file[0].raw // 获取文件图片
      this.$emit('updateCarousel', this.form) // 更新轮播图图片
      this.dialogFormVisible = false
    },
    resetForm() {
      this.form = {}
    }
  }
}
</script>

<style scoped>

</style>
