<template>
  <el-dialog title="新建轮播图" :visible.sync="dialogFormVisible">
    <el-form :model="form" style="margin-top: 40px">
      <el-form-item label="相关比赛:" label-width="100px">
        <el-input
          v-model="form.title"
          type="text"
          placeholder="请输入内容"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
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
  data() {
    return {
      dialogFormVisible: false,
      file: [],
      form: {
        title: '',
        picture: ''
      }
    }
  },
  methods: {
    onChange(_file) {
      // console.log(fileList)
      this.file = _file
    },
    // 添加轮播图
    submit() {
      this.form.picture = this.file[0].raw
      this.$emit('addCarousel', this.form)
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
