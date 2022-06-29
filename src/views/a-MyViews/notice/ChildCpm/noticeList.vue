<template>
  <el-table
    :data="list"
    height="600"
    stripe
  >
    <el-table-column
      label="ID"
      align="center"
      prop="id"
      width="50"
      fixed
    />
    <el-table-column
      label="标题"
      align="center"
      prop="title"
      width="150"
    />

    <el-table-column
      label="发布者"
      align="center"
      prop="publisher"
      width="150"
    />

    <el-table-column
      label="发布时间"
      align="center"
      prop="create_at"
      width="200"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px" type="date">{{
          scope.row.create_at
        }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="公告内容"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <el-button
          type="success"
          size="mini"
          @click="handleDeplay(scope.$index, scope.row)"
        >查看公告内容</el-button>
      </template>

    </el-table-column>

    <el-table-column
      label="公告图片"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <a :href="'http://114.132.236.147:8001/onlinejudge' + scope.row.picture_url" target="_blank">
          <img
            :src="'http://114.132.236.147:8001/onlinejudge' + scope.row.picture_url"
            alt="空图片"
            style="width: 100px; height: 100px;"
          >
        </a>
      </template>

    </el-table-column>

    <el-table-column
      align="right"
      min-width="450"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-input
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
            style="width: 250px;"
            clearable
          >
            <!-- <el-button
              slot="append"
              type="primary"
              icon="el-icon-circle-close"
              @click="search = ''"
            /> -->
          </el-input>
        </div>
        <!-- 由于使用了ESlint，没有使用scope 导致报错，下面的div只为了不让这个错误报错 -->
        <div v-if="false">{{ scope }}</div>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          @click="handleEdit(scope.$index, scope.row)"
        >修改图片</el-button>
        <el-button
          size="mini"
          type="info"
          @click="handleUpdate(scope.$index, scope.row)"
        >修改内容</el-button>
        <!-- <el-button
          size="medium"
          type="warning"
          icon="el-icon-edit"
          circle
          @click="handleUpdate(scope.$index, scope.row)"
        /> -->
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
</template>

<script>
export default {
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
      singleData: [],
      search: '',
      // istype: false,
      roleid: 1
    }
  },
  // computed: {
  //   // 过滤器
  //   showList() {
  //     return this.list.filter(data => {
  //       if (this.search === '') return true
  //       // !this.search || data.Introduction.toLowerCase().includes(this.search.toLowerCase())
  //       if (data.title.toLowerCase().includes(this.search.toLowerCase())) return true
  //       if (data.content.toLowerCase().includes(this.search.toLowerCase())) return true
  //       if (data.publisher.toLowerCase().includes(this.search.toLowerCase())) return true
  //       return false
  //     })
  //   }
  // ,
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  methods: {
    handleEdit(_index, row) {
      // console.log(index, row)
      this.$emit('updatePicture', row)
    },
    handleDeplay(_index, row) {
      // console.log(index, row)
      this.$emit('deplayContent', row)
    },
    handleDelete(_index, row) {
      // console.log(index, row)
      this.$emit('deleteNotice', row)
    },
    handleUpdate(_index, row) {
      // console.log(index, row)
      // this.userdata = row
      this.singleData = row
      this.$emit('updateNotice', row)
    }
  }
}
</script>

<style scoped>
.tag-item{
  display: inline-block;
  margin: 10px 5px;
}
</style>
