<template>
  <el-form :model="form" style="margin-top: 40px">
    <el-form-item label="标题:" label-width="100px">
      <el-input
        v-model="form.title"
        type="text"
        placeholder="请输入内容"
        maxlength="20"
        show-word-limit
      />
    </el-form-item>
    <el-form-item label="内容:" label-width="100px">
      <mavon-editor v-model="form.content" />
    </el-form-item>
    <el-form-item label="图片" label-width="100px">
      <upload ref="upload" @onChange="onChange" />
    </el-form-item>
    <el-form-item align="center">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submit">发 布</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import upload from './upload'
export default {
  components: {
    upload
  },
  data() {
    return {
      file: [],
      form: {
        title: '',
        content: '',
        picture: ''
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    onChange(_file) {
      // console.log(fileList)
      this.file = _file
    },
    submit() {
      if (this.file.length > 0) {
        this.form.picture = this.file[0].raw
        this.$emit('addNotice', this.form)
      } else {
        this.$message({
          type: 'warning',
          message: '请添加图片'
        })
      }
    },
    resetForm() {
      this.form = {}
    }
  }
}
</script>

<style scoped>
.el-input{
  width: 50%;
}
</style>
