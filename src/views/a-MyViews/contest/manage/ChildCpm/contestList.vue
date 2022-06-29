<template>
  <div>
    <el-table :data="list" stripe>

      <el-table-column align="center" label="ID" prop="ID" width="80" fixed />

      <el-table-column align="center" label="竞赛名称" prop="Title" width="150" fixed />

      <el-table-column align="center" label="开始时间" prop="StartTime" width="140" />

      <el-table-column align="center" label="结束时间" prop="EndTime" width="140" />

      <el-table-column align="center" label="开放状态" prop="Status" width="100">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.Password === ''" content="Public" placement="top" effect="light">
            <el-button>Public</el-button>
          </el-tooltip>
          <el-tooltip v-else :content="'Password = '+ scope.row.Password" placement="top" effect="light">
            <el-button>Private</el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="竞赛状态" prop="Status" width="100">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.stime " placement="top">
            <el-switch
              :value="(scope.row.stime && scope.row.etime) ? '1' : '0'"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            />
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column align="center" label="竞赛描述" prop="Description" width="150" />

      <el-table-column align="center" label="创建者" prop="ContestCreatorID" width="80" />

      <!-- <el-table-column align="center" label="创建时间" prop="CreatedAt" width="140">
        <template slot-scope="scope">
          <span style="margin-left: 10px" type="date">{{
            scope.row.CreatedAt
          }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="题目" prop="CreatedAt" width="140">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleDeplay(scope.$index, scope.row)"
          >查看题目</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="题解" width="140">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="answerDeplay(scope.$index, scope.row)"
          >查看题解</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right" min-width="300">
        <template slot="header" slot-scope="scope">
          <div>
            <el-input v-model="search" prefix-icon="el-icon-search" placeholder="输入关键字搜索" style="width: 250px;" clearable />
          </div>
          <div v-if="false">{{ scope }}</div>
        </template>
        <template slot-scope="scope">

          <el-button
            size="medium"
            type="warning"
            icon="el-icon-edit"
            circle
            @click="updateContest(scope.$index, scope.row)"
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
    <div>
      <el-dialog title="题解" :visible.sync="adialogVisible" @close="closeDailog">
        <div class="right-html" v-html="htmla" />
        <div v-show="false">
          <markdown-editor
            ref="markdownEditor"
            v-model="markcontenta"
            language="zh_CN"
            :options="{ hideModeSwitch:true, previewStyle:'tab' }"
          />
          <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="GetHtml">
            Get HTML
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAdminList } from '@/api/admin'
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: {
    MarkdownEditor
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      adialogVisible: false,
      markcontenta: '',
      htmla: '',
      search: ''
      // Status: this.list.Status
      // start_time: this.list.StartTime = moment(this.list.StartTime).format('YYYY-MM-DD HH:MM:SS')
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  mounted() {
    this.getAdminList()
  },
  methods: {
    getAdminList() {
      getAdminList().then(res => {
        for (let i = 0; i < this.list.length; i++) {
          for (let j = 0; j < res.length; j++) {
            if (this.list[i].ContestCreatorID === res[j].id) {
              this.list[i].ContestCreatorID = res[j].admin_name
            }
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    updateContest(_idnex, row) {
      this.$emit('updateContest', row)
    },
    handleDelete(_idnex, row) {
      this.$emit('deleteContest', row)
    },
    handleDeplay(_idnex, row) {
      this.$emit('deplayProblems', row)
    },
    GetHtml() {
      // console.log(this.markcontent)
      this.htmla = this.$refs.markdownEditor.getHtml()
      // console.log('111')
      // console.log(this.html)
    },
    closeDailog() {
      this.markcontent = ''
    },
    answerDeplay(index, item) {
      this.adialogVisible = true
      this.markcontenta = item.Answer
      setTimeout(() => {
        this.GetHtml()
      }, 200)
    }
  }
}
</script>

<style scoped>

</style>
