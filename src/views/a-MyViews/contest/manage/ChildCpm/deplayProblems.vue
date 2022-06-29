<template>
  <el-dialog title="题目列表" :visible.sync="dialogTableVisible">
    <el-table :data="content" border>
      <el-table-column property="ID" label="ID" width="50" />
      <el-table-column property="title" label="标题" width="150" />
      <el-table-column property="time_limit" label="时间限制" width="100" />
      <el-table-column property="memory_limit" label="内存限制" width="100" />
      <el-table-column property="submission_number" label="提交次数" width="50" />
      <el-table-column property="accepted_number" label="AC次数" width="50" />
      <el-table-column property="title" label="标题" width="150" />
      <el-table-column align="center" label="题目公开状态" prop="is_visible" width="150px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_visible"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="题目是否可做" prop="is_visible" width="150px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_public"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          />
        </template>
      </el-table-column>
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
      <el-table-column
        label="样例测试点"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="deplayExample(scope.$index, scope.row)"
          >查看样例测试点</el-button>
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
    return {
      dialogTableVisible: false
    }
  },
  methods: {
    handleDeplay(_index, row) {
      // console.log(index, row)
      this.$emit('deplayDescription', row)
    },
    deplayExample(_index, row) {
      // console.log(index, row)
      this.$emit('deplayExample', row)
    },
    handleEdit(_index, row) {
      // console.log(index, row)
      this.$emit('updateProblem', row)
    },
    handleDelete(_index, row) {
      // console.log(index, row)
      this.$emit('deleteProblem', row)
    }
  }
}
</script>

<style scoped>

</style>
