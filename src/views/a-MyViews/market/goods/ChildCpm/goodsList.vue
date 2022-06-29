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
      width="50"
      fixed
    />

    <el-table-column
      align="center"
      label="商品名"
      prop="goods_name"
      width="100"
    />

    <el-table-column
      align="center"
      label="兑换价值"
      prop="goods_value"
      width="100"
    />

    <el-table-column
      align="center"
      label="库存"
      prop="goods_count"
      width="100"
    />

    <el-table-column
      align="center"
      label="商品类型"
      prop="goods_type"
      width="100"
    />

    <el-table-column
      align="center"
      label="商品描述"
      prop="goods_description"
      width="200"
    />

    <el-table-column
      label="商品图片"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <a :href="'http://114.132.236.147:8001/onlinejudge' + scope.row.goods_photo_url" target="_blank">
          <img
            :src="'http://114.132.236.147:8001/onlinejudge' + scope.row.goods_photo_url"
            alt="未找到图片"
            style="width: 100px; height: 100px;"
          >
        </a>
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      min-width="300"
    >
      <template slot="header" slot-scope="scope">
        <div>
          <el-button type="primary" style="width: 100px; margin-right: 10px" @click="addGoods">
            添加商品
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
        <!-- <el-button
          size="mini"
          type="info"
          @click="modifyEmailClick(scope.$index, scope.row)"
        >修改用户名</el-button> -->
        <!-- <el-button
          size="medium"
          circle
          icon="el-icon-edit"
          type="warning"
          @click="updateGoods(scope.$index, scope.row)"
        /> -->
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
        <el-button
          size="medium"
          circle
          icon="el-icon-delete"
          type="danger"
          @click="deleteGoods(scope.$index, scope.row)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {

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
    handleEdit(_index, row) {
      // console.log(index, row)
      this.$emit('updatePicture', row)
    },
    handleUpdate(_index, row) {
      this.$emit('updateGoods', row) // 修改商品
    },
    deleteGoods(_index, row) {
      this.$emit('deleteGoods', row) // 删除商品
    },
    addGoods() {
      this.$emit('addGoods')
    }
  }
}
</script>

<style scoped>

</style>
