<template>
  <el-dialog title="样例列表" :visible.sync="dialogTableVisible">
    <el-table :data="content" border>
      <el-table-column property="ID" label="ID" width="50" />
      <!-- <el-table-column property="Input" label="输入样例" width="150" />
      <el-table-column property="Output" label="输出样例" width="150" /> -->
      <el-table-column
        label="输入样例"
        align="center"
        width="200"
      >
        <template>
          <div class="right-html" v-html="htmlin" />
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
        </template>
      </el-table-column>
      <el-table-column
        label="输入样例"
        align="center"
        width="200"
      >
        <template>
          <div class="right-html" v-html="htmlout" />
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
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="right"
        min-width="120"
      >
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="warning"
            icon="el-icon-edit"
            circle
            @click="handleEdit(scope.$index, scope.row)"
          />
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
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
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      markin: '',
      markout: '',
      htmlin: '',
      htmlout: '',
      dialogTableVisible: false
    }
  },
  watch: {
    content(_1, _2) {
      this.markin = _1[0].Input
      // console.log(this.markin)
      this.markout = _1[0].Output
      // console.log(this.markcontent)
      setTimeout(() => {
        this.GetHtml()
      }, 200)
    }
  },
  methods: {
    handleEdit(_index, row) {
      // console.log(index, row)
      this.$emit('updateExample', row)
    },
    handleDelete(_index, row) {
      // console.log(index, row)
      this.$emit('deleteExample', row)
    },
    GetHtml() {
      // console.log(this.markcontent)
      this.htmlin = this.$refs.markdownEditor1.getHtml()
      this.htmlout = this.$refs.markdownEditor2.getHtml()
      // console.log('111')
      // console.log(this.html)
    }
  }
}
</script>

<style scoped>

</style>
