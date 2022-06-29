<template>
  <el-dialog title="题目列表">
    <el-table :data="content" border>
      <el-table-column property="ID" label="ID" width="50" />
      <el-table-column property="Title" label="标题" width="150" />
      <el-table-column
      label="题目描述"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <el-button
          type="success"
          size="mini"
          @click="handleDeplay(scope.$index, scope.row)"
        >查看题目描述</el-button>
      </template>

    </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    handleDeplay(_index, row) {
      // console.log(index, row)
      this.$emit('deplayDescription', row)
    },
  }
}
</script>

<style scoped>

</style>
