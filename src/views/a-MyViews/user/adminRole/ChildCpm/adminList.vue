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
      width="50"
      fixed
    />
    <el-table-column
      label="账号"
      align="center"
      prop="admin_account"
      width="100"
    />

    <el-table-column
      label="姓名"
      align="center"
      prop="admin_name"
      width="150"
    />

    <el-table-column
      label="权限"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <div
          v-for="item in scope.row.admin_roles.split(' ')"
          :key="item"
          class="tag-item"
        >
          <el-tag :type="(item === 'admin' && roleid === 1) ? 'success' : 'warning'">{{ item }}</el-tag>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      min-width="450"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-button type="primary" style="width: 100px; margin-right: 10px" @click="addAdmin">
            添加管理员
          </el-button>
          <el-input
            v-model="search"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
            style="width: 250px;"
            clearable
          />
        </div>
        <!-- 由于使用了ESlint，没有使用scope 导致报错，下面的div只为了不让这个错误报错 -->
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
    // 父组件的值
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
      roleid: 1
    }
  },
  computed: {
    // 过滤器
    showList() {
      return this.list.filter(data => {
        if (this.search === '') return true
        if (data.admin_account.toLowerCase().includes(this.search.toLowerCase())) return true
        if (data.admin_name.toLowerCase().includes(this.search.toLowerCase())) return true
        if (data.admin_roles.toLowerCase().includes(this.search.toLowerCase())) return true
        return false
      })
    }
  },
  methods: {
    // 删除管理员
    handleDelete(_index, row) {
      this.$emit('deleteAdmin', row)
    },
    // 编辑管理员
    handleUpdate(_index, row) {
      this.singleData = row
      this.$emit('updateAdmin', row)
    },
    // 添加管理员
    addAdmin() {
      this.$emit('addAdmin')
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
