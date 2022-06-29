<template>
  <el-dialog title="编辑公告" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="标题:" label-width="100px">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="内容:" label-width="100px">
        <mavon-editor v-model="form.content" />
      </el-form-item>
      <!-- <el-form-item label="密码:" label-width="100px">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item> -->
      <!-- <el-form-item label="角色:" label-width="100px">
        <el-input v-model="form.roles" autocomplete="off" />
      </el-form-item> -->
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
      // file: [],
      form: {
        alter_id: 0,
        title: '',
        content: ''
      },
      // adminList: [],
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.id
      this.form.title = _1.title
      this.form.content = _1.content
      // this.form.picture = _1.picture
    }
  },
  methods: {
    submit() {
      this.$emit('updateNotice', this.form)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
