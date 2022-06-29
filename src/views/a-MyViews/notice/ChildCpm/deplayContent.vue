<template>
  <el-dialog title="公告内容" :visible.sync="dialogVisible" @close="closeDailog">
    <!-- <el-table :data="list" border>
      <el-table-column prop="content" label="内容" width="auto" align="center" />
    </el-table> -->
    <div class="right-html" v-html="html" />
    <div v-show="false">
      <markdown-editor
        ref="markdownEditor"
        v-model="markcontent"
        language="zh_CN"
        :options="{ hideModeSwitch:true, previewStyle:'tab' }"
      />
      <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="GetHtml">
        Get HTML
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: {
    MarkdownEditor
  },
  props: {
    content: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      markcontent: '',
      html: '',
      dialogVisible: false
    }
  },
  watch: {
    content(_1, _2) {
      this.markcontent = _1.content
      // console.log(this.markcontent)
      setTimeout(() => {
        this.GetHtml()
      }, 200)
    }
  },
  methods: {
    closeDailog() {
      this.markcontent = ''
    },
    // viewDetailClick() {
    // },
    GetHtml() {
      // console.log(this.markcontent)
      this.html = this.$refs.markdownEditor.getHtml()
      // console.log('111')
      // console.log(this.html)
    }
  }
}
</script>

<style scoped>

</style>
