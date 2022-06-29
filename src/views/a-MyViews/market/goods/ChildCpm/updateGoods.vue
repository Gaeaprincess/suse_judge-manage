<template>
  <el-dialog title="编辑公告" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="商品名称:" label-width="100px">
        <el-input v-model="form.goods_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品描述:" label-width="100px">
        <el-input v-model="form.goods_description" type="textarea" autosize autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品价值:" label-width="100px">
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
      <!-- <el-form-item label="图片" label-width="100px">
        <upload ref="upload" @onChange="onChange" />
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import upload from './upload'
import { getTypeList } from '@/api/type'
// import { getAdminList } from '@/api/admin'
export default {
  // components: {
  //   upload
  // },
  props: {
    ruleform: {
      type: Object,
      default() {
        return {}
      }
    },
    uid: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: [],
      // file: [],
      form: {
        alter_id: 0,
        goods_name: '',
        goods_description: '',
        goods_value: '',
        goods_count: '',
        goods_type: ''
      },
      // adminList: [],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.id
      this.form.goods_name = _1.goods_name
      this.form.goods_description = _1.goods_description
      this.form.goods_value = _1.goods_value
      this.form.goods_count = _1.goods_count
      this.form.goods_type = _1.goods_type
    }
  },
  // created() {
  //   console.log("111")
  // },
  // created() {
  //   // 页面加载前，先请求所有管理员列表
  //   this.getAdminLists()
  // },
  created() {
    // 页面加载前，先请求所有管理员列表
    this.getTypeList()
  },
  methods: {
    // onChange(_file, fileList) {
    //   console.log('1')
    //   this.file = _file
    //   console.log(_file)
    //   console.log(typeof _file)
    //   console.log('2')
    //   this.picture = _file
    // },
    // 获取管理员列表
    //  getAdminLists() {
    //   getAdminList().then(res => {
    //     this.adminList = res
    //   })
    // },
    getTypeList() {
      getTypeList().then(res => {
        for (let i = 0; i < res.length; i++) {
          this.options[i] = res[i].content
        }
      })
    },
    submit() {
      // this.form.picture = this.file[0]
      // console.log(this.file)
      // console.log(this.form.picture)
      // this.$delete(this.form, 'id')
      // this.$delete(this.form, 'admin_roles')
      // console.log(this.id)
      this.form.goods_count = parseInt(this.form.goods_count)
      this.form.goods_value = parseInt(this.form.goods_value)
      this.$emit('updateGoods', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
