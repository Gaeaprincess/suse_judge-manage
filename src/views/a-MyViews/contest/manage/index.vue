<template>
  <div>
    <contest-list
      :list="showList"
      @search="search"
      @deplayProblems="deplayProblems"
      @updateContest="updateContest"
      @deleteContest="deleteContest"
    />
    <pages
      :total-pages="totalPages"
      @pageChange="pageChange"
    />
    <update-contest
      ref="updateContest"
      :ruleform="singleData"
      @updateContest="updateSubmitContest"
    />
    <deplay-problems
      ref="deplayProblems"
      :content="contentData"
      @deplayDescription="deplayDescription"
      @deplayExample="deplayExample"
      @updateProblem="updateProblem"
      @deleteProblem="deleteProblem"
    />
    <update-problem
      ref="updateProblem"
      :ruleform="problemData"
      @updateProblem="updateSubmitProblem"
    />
    <deplay-description
      ref="deplayDescription"
      :content="descriptionData"
    />
    <deplay-example
      ref="deplayExample"
      :content="exampleData"
      @updateExample="updateExample"
      @deleteExample="deleteExample"
    />
    <update-example
      ref="updateExample"
      :ruleform="dataExample"
      @updateExample="updateSubmitExample"
    />
  </div>
</template>

<script>
import ContestList from './ChildCpm/contestList.vue'
import Pages from './ChildCpm/pages.vue'
import UpdateContest from './ChildCpm/updateContest.vue'
import DeplayProblems from './ChildCpm/deplayProblems.vue'
import DeplayExample from './ChildCpm/deplayExample.vue'
import DeplayDescription from './ChildCpm/deplayDescription.vue'
import UpdateProblem from './ChildCpm/updateProblem.vue'
import UpdateExample from './ChildCpm/updateExample.vue'
import {
  getContestList,
  deleteContest,
  updateContest
} from '@/api/contest'
import {
  getProblemList,
  deleteProblem,
  updateProblem
} from '@/api/problem'
import {
  getExampleList,
  deleteExample,
  updateExample
} from '@/api/example'
export default {
  components: {
    DeplayExample,
    DeplayDescription,
    ContestList,
    DeplayProblems,
    Pages,
    UpdateContest,
    UpdateProblem,
    UpdateExample
  },
  data() {
    return {
      singleData: {},
      activePage: 1,
      contentData: [],
      problemData: {},
      exampleData: [],
      dataExample: {},
      descriptionData: {},
      totalPages: 0,
      everyPageShowItemNumber: 6,
      allContestList: [],
      searchList: [], // 筛选后的数据
      activeUserId: null,
      form: {
        ID: ''
      },
      exampleForm: {
        ID: ''
      },
      contest_id: ''
    }
  },
  computed: {
    showList() {
      return this.searchList.slice(
        (this.activePage - 1) * this.everyPageShowItemNumber,
        (this.activePage - 1) * this.everyPageShowItemNumber + this.everyPageShowItemNumber

      )
    }
  },
  created() {
    this.getContestLists()
    // this.getProblemList()
    // this.getExampleList()
  },
  methods: {
    search(val) {
      this.searchList = this.allContestList.filter(data => {
        if (val === '' ||
          data.Title.includes(val) ||
          data.Description.includes(val)
        ) return true
        return false
      })
      this.totalPages = Math.ceil(this.searchList.length / this.everyPageShowItemNumber) * 10
    },
    pageChange(page) {
      this.activePage = page
    },
    getContestLists() {
      getContestList().then(res => {
        this.totalPages = Math.ceil(res.length / this.everyPageShowItemNumber) * 10
        this.allContestList = res
        for (let i = 0; i < this.allContestList.length; i++) {
          // this.allContestList[i].EndTime = moment(this.allContestList[i].EndTime).format('YYYY-MM-DD HH:MM:SS')
          // this.allContestList[i].StartTime = moment(this.allContestList[i].StartTime).format('YYYY-MM-DD HH:MM:SS')
          // this.allContestList[i].CreatedAt = moment(this.allContestList[i].CreatedAt).format('YYYY-MM-DD HH:MM:SS')
          var date = new Date(this.allContestList[i].StartTime).toJSON()
          this.allContestList[i].StartTime = new Date(+new Date(date)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          var edate = new Date(this.allContestList[i].EndTime).toJSON()
          this.allContestList[i].EndTime = new Date(+new Date(edate)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          this.allContestList[i].etime = new Date(this.allContestList[i].EndTime).getTime() > new Date().getTime()
          this.allContestList[i].stime = new Date(this.allContestList[i].StartTime).getTime() < new Date().getTime()
        }
        this.search('')
      })
    },
    deleteContest(item) {
      this.$confirm('此操作将删除该竞赛, 是否继续?', '警告', {
        confirmButtonText: '确定',
        concelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteContest(item).then(res => {
          this.getContestLists()
          this.$message({
            type: 'success',
            message: res.msg
          })
        }).catch(err => {
          this.$message({
            type: 'warning',
            message: err
          })
        })
      })
    },
    updateContest(item) {
      this.singleData = item
      this.activeUserId = item.id
      this.$refs.updateContest.dialogVisible = true
    },
    updateSubmitContest(info) {
      updateContest(info).then(res => {
        this.getContestLists()
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    getProblemList(item) {
      getProblemList(item).then(res => {
        this.contentData = res
        console.log(this.contentData)
      }).catch(err => {
        console.log(err)
      })
    },
    deplayProblems(item) {
      this.activeUserId = item.ID // 保存当前用户信息
      this.contest_id = item.ID
      this.form.ID = item.ID
      getProblemList(item).then(res => {
        this.contentData = res
      }).catch(err => {
        console.log(err)
      })
      this.$refs.deplayProblems.dialogTableVisible = true // 拉起对话框
    },
    deplayDescription(item) {
      this.activeUserId = item.id
      this.descriptionData = item
      this.$refs.deplayDescription.dialogVisible = true // 拉起对话框
    },
    deleteProblem(item) {
      deleteProblem(item).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getProblemList(this.form)
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    updateProblem(item) {
      this.problemData = item
      this.activeUserId = item.id
      this.$refs.updateProblem.dialogVisible = true
    },
    updateSubmitProblem(info) {
      info.contest_id = this.contest_id
      updateProblem(info).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getProblemList(this.form)
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    getExampleList(item) {
      getExampleList(item).then(res => {
        this.exampleData = res
      }).catch(err => {
        console.log(err)
      })
    },
    deplayExample(item) {
      this.activeUserId = item.ID
      // console.log(item)
      this.exampleForm.ID = item.ID
      getExampleList(this.exampleForm).then(res => {
        this.exampleData = res
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
      this.$refs.deplayExample.dialogTableVisible = true // 拉起对话框
    },
    updateExample(item) {
      this.dataExample = item
      // console.log(this.dataExample)
      this.$refs.updateExample.dialogVisible = true
    },
    updateSubmitExample(info) {
      updateExample(info).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getExampleList(this.exampleForm)
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    deleteExample(item) {
      deleteExample(item).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.getExampleList(this.exampleForm)
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
