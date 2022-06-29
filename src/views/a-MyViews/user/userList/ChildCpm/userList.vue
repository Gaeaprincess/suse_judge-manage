<template>
  <el-table
    :data="list"
    max-height="800"
    stripe
  >
    <el-table-column
      align="center"
      label="ID"
      prop="id"
      width="80"
      fixed
    />

    <el-table-column
      align="center"
      label="用户名"
      prop="user_name"
      width="200"
    />

    <el-table-column
      align="center"
      label="邮箱"
      prop="user_email"
      width="200"
    />

    <el-table-column
      align="center"
      label="用户状态"
      prop="deleted_at"
      width="200"
    >
      <el-tooltip :content="'用户状态: 使用中'" placement="top">
        <el-switch
          v-model="value"
          active-text="使用中"
          disabled
        />
      </el-tooltip>
    </el-table-column>
    <!-- <el-table-column
      label="用户头像"
      width="180"
    >
      <template slot-scope="scope">
        <el-tag :type="scope.row.avatar ? 'success' : 'info'">
          <a v-if="scope.row.avatar" :href="'http://114.132.236.147/gxa' + scope.row.avatar" target="_blank">
            点击查看用户头像
          </a>
          <span v-else>用户当前没有设置头像</span>
        </el-tag>
      </template>
    </el-table-column> -->
    <el-table-column
      align="right"
      min-width="300"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-button type="primary" style="width: 100px; margin-right: 10px" @click="addUser">
            添加用户
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
          circle
          icon="el-icon-edit"
          type="warning"
          @click="modifyInfoClick(scope.$index, scope.row)"
        />
        <el-button
          size="medium"
          circle
          icon="el-icon-delete"
          type="danger"
          @click="deleteUserClick(scope.$index, scope.row)"
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
      value: true,
      search: '' // 过滤器的值
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  methods: {
    modifyInfoClick(_index, row) {
      this.$emit('modifyInfoClick', row) // 修改密码
    },
    deleteUserClick(_index, row) {
      this.$emit('deleteUserClick', row) // 删除用户
    },
    modifyEmailClick(_index, row) {
      this.$emit('modifyEmailClick', row) // 修改邮箱
    },
    addUser() {
      // console.log('添加用户')
      this.$emit('addUser')
    }
  }
}
</script>

<style scoped>

</style>
