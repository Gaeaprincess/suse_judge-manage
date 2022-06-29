<template>
  <el-table
    :data="list"
    max-height="800"
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
      label="用户名"
      prop="UserID"
      width="100"
    />

    <el-table-column
      align="center"
      label="商品名"
      prop="GoodsID"
      width="150"
    />
    <el-table-column
      align="center"
      label="总价格"
      prop="Value"
      width="100"
    />

    <el-table-column align="center" label="下单时间" prop="CreatedAt" width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px" type="date">{{
          scope.row.CreatedAt
        }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="取货时间" prop="GetTime" width="200">
      <template slot-scope="scope">
        <span v-if="scope.row.GetTime !== '未取货'" style="margin-left: 10px" type="date">{{
          scope.row.GetTime
        }}</span>
        <span v-else style="margin-left: 10px">未取货</span>
      </template>
    </el-table-column>

    <el-table-column
      align="center"
      label="订单状态"
      prop="Status"
      width="200"
    >
      <template slot-scope="scope">
        <el-tooltip :content="'Switch value: ' + scope.row.Status " placement="top">
          <el-switch
            :value="(scope.row.Status === 1) ? '1' : '0'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          />
        </el-tooltip>
      </template>
    </el-table-column>
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
          type="warning"
          @click="modifyInfoClick(scope.$index, scope.row)"
        >确认收货</el-button>
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
      this.$emit('updateOrder', row)
    }
  }
}
</script>

<style scoped>

</style>
