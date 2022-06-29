<template>
  <el-dialog title="题目内容" :visible.sync="dialogVisible" @close="closeDailog">
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
    <div class="display">
      <el-button type="text" icon="el-icon-document-copy" @click="handleCopy" />
      <div class="htmlin" v-html="htmlin" />
      <div v-show="false">
        <markdown-editor
          ref="markdownEditor1"
          v-model="markin"
          language="zh_CN"
          :options="{ hideModeSwitch:true, previewStyle:'tab' }"
        />
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="GetHtml">
          Get HTML
        </el-button>
      </div>
      <div class="htmlin" v-html="htmlout" />
      <div v-show="false">
        <markdown-editor
          ref="markdownEditor2"
          v-model="markout"
          language="zh_CN"
          :options="{ hideModeSwitch:true, previewStyle:'tab' }"
        />
        <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="GetHtml">
          Get HTML
        </el-button>
      </div>
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
      markin: '',
      markout: '',
      html: '',
      htmlin: '',
      htmlout: '',
      dialogVisible: false
    }
  },
  watch: {
    content(_1, _2) {
      this.markcontent = _1.description + '\n' + _1.input_description + '\n' + _1.output_description
      var first = _1.samples.indexOf(':')
      var second = _1.samples.indexOf('o')
      for (var i = 0; i < _1.samples.length; i++) {
        var seconds = _1.samples.indexOf(':', first + 1)
      }
      this.markin = _1.samples.slice(first + 1, second)
      this.markout = _1.samples.slice(seconds + 1)
      setTimeout(() => {
        this.GetHtml()
      }, 200)
    }
  },
  mounted() {
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
      this.htmlin = this.$refs.markdownEditor1.getHtml()
      this.htmlout = this.$refs.markdownEditor2.getHtml()
      // console.log('111')
      // console.log(this.html)
    },
    handleCopy() {
      const url = this.markin
      const onput = document.createElement('input')
      onput.value = url
      document.body.appendChild(onput)
      onput.select()
      document.execCommand('Copy')
      this.$message({
        type: 'success',
        message: '复制成功'
      })
      onput.remove()
    }
  }
}
</script>

<style scoped>
.display{
  display: flex;
}
.htmlin{
  border:1px solid #000;
  width: 40%;
  padding: 10px;
  margin-right: 20px;
}
</style>
