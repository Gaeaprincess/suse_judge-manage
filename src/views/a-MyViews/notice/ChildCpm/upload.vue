<template>
  <el-upload
    ref="uploads"
    class="upload-demo"
    drag
    multiple
    action=""
    :auto-upload="false"
    :on-change="onChange"
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  methods: {
    onChange(_file, fileList) {
      this.$emit('onChange', fileList)
    }
  }
}
</script>

<style scoped>

</style>
