<template>
  <el-table
    :data="list"
    stripe
  >
    <el-table-column
      align="center"
      label="ID"
      prop="ID"
      width="80"
      fixed
    />

    <el-table-column
      align="center"
      label="总积分值"
      prop="Value"
      width="150"
    />

    <el-table-column
      align="center"
      label="已兑换积分值"
      prop="ConsumptionValue"
      width="150"
    />

    <el-table-column
      align="center"
      label="更新时间"
      prop="UpdatedAt"
      width="200"
    >
      <template slot-scope="scope">
        <span style="margin-left: 10px" type="date">{{ scope.row.UpdatedAt }}</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="用户"
      width="200"
      prop="username"
    />

    <el-table-column
      align="right"
      min-width="300"
    >
      <template slot="header" slot-scope="scope">
        <div>
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
          @click="updateIntegral(scope.$index, scope.row)"
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
    updateIntegral(_index, row) {
      this.$emit('updateIntegral', row) // 修改积分
    }
  }
}
</script>

<style scoped>

</style>
