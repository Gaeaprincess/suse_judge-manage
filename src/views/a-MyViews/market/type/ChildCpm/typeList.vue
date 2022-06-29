<template>
  <el-table
    :data="showList"
    height="600"
    stripe
  >
    <el-table-column
      label="ID"
      align="center"
      prop="id"
      width="100"
      fixed
    />
    <el-table-column
      label="商品类型"
      align="center"
      prop="content"
      width="200"
    />

    <el-table-column
      align="right"
      min-width="450"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-button type="primary" style="width: 100px; margin-right: 10px" @click="addType">
            添加类型
          </el-button>
          <el-input
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
            style="width: 250px;"
            clearable
          />
        </div>
        <div v-if="false">{{ scope }}</div>
      </template>
      <template slot-scope="scope">
        <el-button
          size="medium"
          type="warning"
          icon="el-icon-edit"
          circle
          @click="handleUpdate(scope.$index, scope.row)"
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
      search: ''
      // istype: false,
    }
  },
  computed: {
    // 过滤器
    showList() {
      return this.list.filter(data => {
        if (this.search === '') return true
        // !this.search || data.Introduction.toLowerCase().includes(this.search.toLowerCase())
        if (data.content.toLowerCase().includes(this.search.toLowerCase())) return true
        // if (data.admin_name.toLowerCase().includes(this.search.toLowerCase())) return true
        // if (data.admin_roles.toLowerCase().includes(this.search.toLowerCase())) return true
        return false
      })
    }
  },

  methods: {
    handleDelete(_index, row) {
      // console.log(index, row)
      this.$emit('deleteType', row)
    },
    handleUpdate(_index, row) {
      // console.log(index, row)
      // this.userdata = row
      this.singleData = row
      this.$emit('updateType', row)
    },
    addType() {
      this.$emit('addType')
    }
    // showTitle(item) {
    //   for (const i of this.userRoles) if (i.id === item) return i.title
    //   return ''
    // }
  }
}
</script>

<style scoped>
.tag-item{
  display: inline-block;
  margin: 10px 5px;
}
</style>
