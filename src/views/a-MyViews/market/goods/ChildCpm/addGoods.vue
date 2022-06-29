<template>
  <el-dialog title="添加商品" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="商品名:" label-width="100px">
        <el-input v-model="form.goods_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="兑换价值:" label-width="100px">
        <el-input v-model="form.goods_value" autocomplete="off" />
      </el-form-item>
      <el-form-item label="库存:" label-width="100px">
        <el-input v-model="form.goods_count" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品类型:" label-width="100px">
        <el-select v-model="form.goods_type" placeholder="请选择商品类型">
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片" label-width="100px">
        <upload ref="upload" @onChange="onChange" />
      </el-form-item>
      <el-form-item label="商品描述:" label-width="100px">
        <el-input v-model="form.goods_description" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getTypeList } from '@/api/type'
import upload from './upload'
export default {
  components: {
    upload
  },
  data() {
    return {
      dialogVisible: false,
      file: [],
      options: [],
      form: {
        goods_name: '',
        goods_count: '',
        goods_value: '',
        goods_type: '',
        photo: '',
        goods_description: ''
      },
      formLabelWidth: '100px'
    }
  },
  created() {
    // 页面加载前，先请求所有类型列表
    this.getTypeList()
  },
  methods: {
    onChange(_file) {
      // console.log(fileList)
      this.file = _file
    },
    submit() {
      this.form.photo = this.file[0].raw
      this.$emit('addGoods', this.form)
      this.dialogVisible = false
      this.form = {}
    },
    getTypeList() {
      getTypeList().then(res => {
        for (let i = 0; i < res.length; i++) {
          this.options[i] = res[i].content
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
