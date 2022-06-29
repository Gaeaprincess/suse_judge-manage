<template>
  <el-row>
    <div style="margin: 20px 20px;">
      <el-button type="primary" @click="addCarousel">添加轮播图</el-button>
    </div>
    <el-col v-for="(item, index) in list" :key="index" :span="8" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '5px'}" style="margin: 20px;">
        <img
          :src="'http://114.132.236.147:8001/onlinejudge' + item.url"
          alt="空图片"
          class="image"
          height="200px"
        >
        <div style="padding: 14px; text-align: center;">
          <span>比赛：<el-tag type="success">{{ item.title }}</el-tag></span>
          <div class="bottom clearfix">
            <el-button type="warning" @click="handleEdit(item)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(item)">删除</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
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
      search: ''
    }
  },
  watch: {
    search(o, _l) {
      this.$emit('search', o) // 过滤器
    }
  },
  methods: {
    handleEdit(item) {
      this.$emit('updateCarousel', item) // 更新轮播图
    },
    handleDelete(item) {
      this.$emit('deleteCarousel', item) // 删除轮播图
    },
    addCarousel() {
      this.$emit('addCarousel') // 添加轮播图
    }
  }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 50%;
    margin: auto;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
