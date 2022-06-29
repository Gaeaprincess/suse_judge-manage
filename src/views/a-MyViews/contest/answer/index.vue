<template>
  <el-card class="answer">
    <el-select v-model="ruleform.contest_id" placeholder="请选择竞赛ID" style="margin-bottom: 10px; margin-right: 10px;" @change="deplayProblems">
      <el-option
        v-for="item in allContestList"
        :key="item.Title"
        :label="item.Title"
        :value="item.ID"
      />
    </el-select>
    <el-table style="width: 50%" :data="contentData" border :show-header="contentData.length === 0 ? false : true" empty-text="竞赛题目为空 请添加">
      <el-table-column property="ID" label="ID" width="100px" />
      <el-table-column property="title" label="标题" width="200px" />
    </el-table>
    <mavon-editor v-model="ruleform.content" style="margin:20px 0px" />
    <el-button @click="resetForm">重 置</el-button>
    <el-button type="primary" @click="submit(ruleform)">发 布</el-button>
  </el-card>
</template>

<script>
import { getContestList, addAnswer } from '@/api/contest'
import { getProblemList } from '@/api/problem'
export default {
  props: {

  },
  data() {
    return {
      allContestList: [], // 所有竞赛
      contentData: [], // 该比赛对应的问题列表
      dialogVisible: false,
      ruleform: {
        contest_id: null,
        content: ''
      },
      form: {
        ID: ''
      }
    }
  },
  created() {
    this.getContestLists()
  },
  methods: {
    // 获取竞赛列表
    getContestLists() {
      getContestList().then(res => {
        this.allContestList = res
      })
    },
    // 获取问题列表
    deplayProblems() {
      this.form.ID = this.ruleform.contest_id
      getProblemList(this.form).then(res => {
        this.contentData = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 发布题解
    submit(item) {
      addAnswer(item).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.ruleform = {}
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    resetForm() {
      this.ruleform = {}
      this.form = {}
    }
  }
}
</script>

<style scoped>
.answer{
  margin: 50px;

}
</style>
