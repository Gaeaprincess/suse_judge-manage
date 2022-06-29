<template>
  <div style="margin: 50px;">
    <el-tabs type="border-card">
      <el-tab-pane label="发表竞赛">
        <el-form :model="form" style="margin-top: 10px">
          <el-form-item label="开始时间:" label-width="100px">
            <div class="block">
              <el-date-picker
                v-model="form.start_time"
                type="datetime"
                style="width: 30%;"
                placeholder="选择日期时间"
              />
            </div>
          </el-form-item>
          <el-form-item label="结束时间:" label-width="100px">
            <div class="block">
              <el-date-picker
                v-model="form.end_time"
                type="datetime"
                style="width: 30%;"
                placeholder="选择日期时间"
              />
            </div>
          </el-form-item>
          <el-form-item label="开放状态:" label-width="100px">
            <el-select v-model="value" placeholder="请选择状态" @change="changeValue">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-show="status" label="密码:" label-width="100px">
            <el-input v-model="form.password" style="width: 50%;" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item label="标题:" label-width="100px">
            <el-input
              v-model="form.title"
              class="description"
              type="text"
              placeholder="请输入标题"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="内容:" label-width="100px">
            <el-input
              v-model="form.description"
              class="description"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item align="center">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="submit">发 布</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发表题目">
        <el-select v-model="ruleform.ID" placeholder="请选择竞赛ID" style="margin-bottom: 10px; margin-right: 10px;" @change="deplayProblems">
          <el-option
            v-for="item in allContestList"
            :key="item.Title"
            :label="item.Title"
            :value="item.ID"
          />
        </el-select>
        <!-- <el-button type="primary" @click="">添加题目</el-button> -->
        <el-table style="width: 50%" :data="contentData" border :show-header="contentData.length === 0 ? false : true" empty-text="竞赛题目为空 请添加">
          <el-table-column property="ID" label="ID" width="100px" />
          <el-table-column property="title" label="标题" width="200px" />
        </el-table>
        <el-form :model="problemForm" style="margin-top: 10px">
          <el-form-item label="标题:" label-width="120px">
            <el-input
              v-model="problemForm.title"
              class="description"
              type="text"
              placeholder="请输入标题"
              maxlength="20"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="时间限制:" label-width="120px">
            <el-input
              v-model="problemForm.time_limit"
              style="width: 200px;"
              type="number"
              placeholder="请输入时间大小"
            />
          </el-form-item>
          <el-form-item label="内存限制:" label-width="120px">
            <el-input
              v-model="problemForm.memory_limit"
              style="width: 200px;"
              type="number"
              placeholder="请输入内存大小"
            />
          </el-form-item>
          <el-form-item label="题目是否可做:" label-width="120px">
            <el-radio-group v-model="problemForm.is_public" @change="changeStatus">
              <el-radio :label="false">不可做</el-radio>
              <el-radio :label="true">可做</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="题目公开状态:" label-width="120px">
            <el-radio-group v-model="problemForm.is_visible" @change="changeStatuss">
              <el-radio :label="false">不公开</el-radio>
              <el-radio :label="true">公开</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标题描述:" label-width="120px">
            <mavon-editor v-model="problemForm.description" />
          </el-form-item>
          <el-form-item label="标题输入输出:" label-width="120px">
            <div style="display: flex;">
              <mavon-editor v-model="problemForm.input_description" style="width: 50%;" />
              <mavon-editor v-model="problemForm.out_put_description" style="width: 50%;" />
            </div>
          </el-form-item>
          <el-form-item label="输入输出样例:" label-width="120px">
            <mavon-editor v-model="problemForm.sample" />
          </el-form-item>
          <el-form-item align="center">
            <el-button @click="resetProblemForm">重 置</el-button>
            <el-button type="primary" @click="problemSubmit(problemForm)">发 布</el-button>
          </el-form-item>
        </el-form>
        <el-select v-model="exampleForm.problem_id" placeholder="请选择题目ID" style="margin-bottom: 10px; margin-right: 10px;">
          <el-option
            v-for="item in contentData"
            :key="item.ID"
            :label="item.ID"
            :value="item.ID"
          />
        </el-select>
        <el-form :model="exampleForm" style="margin-top: 10px">
          <el-form-item label="样例输入1:" label-width="100px">
            <mavon-editor v-model="exampleForm.input" />
          </el-form-item>
          <el-form-item label="样例输出1:" label-width="100px">
            <mavon-editor v-model="exampleForm.output" />
          </el-form-item>
          <el-form-item align="center">
            <el-button @click="resetEaxmpleForm">重 置</el-button>
            <el-button type="primary" @click="exampleSubmit(exampleForm)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getContestList } from '@/api/contest'
import { getProblemList, addProblem } from '@/api/problem'
import { addExample } from '@/api/example'
import moment from 'moment'
export default {
  data() {
    return {
      status: false,
      value: '',
      allContestList: [],
      contentData: [],
      options: [
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Private',
          value: 'Private'
        }
      ],
      ruleform: {
        ID: null
      },
      exampleForm: {
        problem_id: '',
        input: '',
        output: ''
      },
      // 问题表单
      problemForm: {
        title: '',
        description: '',
        input_description: '',
        out_put_description: '',
        is_public: false,
        sample: '',
        time_limit: null,
        memory_limit: null,
        is_visible: false,
        contest_id: null
      },
      form: {
        password: '',
        title: '',
        description: '',
        start_time: '',
        end_time: ''
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    this.getContestLists()
  },
  methods: {
    changeStatus(item) {
      if (item === false) {
        this.problemForm.is_public = false
      } else {
        this.problemForm.is_public = true
      }
    },
    changeStatuss(item) {
      if (item === false) {
        this.problemForm.is_visible = false
      } else {
        this.problemForm.is_visible = true
      }
    },
    changeValue(item) {
      if (item === 'Private') {
        this.status = true
      } else {
        this.status = false
      }
    },
    // 添加竞赛
    submit() {
      this.form.start_time = moment(this.form.start_time).format('YYYY-MM-DD HH:mm:ss')
      this.form.end_time = moment(this.form.end_time).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('addContest', this.form)
      this.form = {}
    },
    resetForm() {
      this.form = {}
    },
    resetProblemForm() {
      this.problemForm = {}
    },
    resetEaxmpleForm() {
      this.exampleForm = {}
    },
    getContestLists() {
      getContestList().then(res => {
        this.allContestList = res
      })
    },
    // 展示问题列表
    deplayProblems() {
      getProblemList(this.ruleform).then(res => {
        this.contentData = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加问题
    problemSubmit(item) {
      this.problemForm.contest_id = this.ruleform.ID
      this.problemForm.time_limit = parseInt(this.problemForm.time_limit)
      this.problemForm.memory_limit = parseInt(this.problemForm.memory_limit)
      addProblem(item).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
        this.deplayProblems()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    exampleSubmit(item) {
      addExample(item).then(res => {
        this.$message({
          type: 'success',
          message: res
        })
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
.description{
  width: 50%;
}
</style>
