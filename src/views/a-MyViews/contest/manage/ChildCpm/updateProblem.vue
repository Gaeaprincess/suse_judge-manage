<template>
  <el-dialog title="编辑题目" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="标题:" label-width="100px">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="时间限制:" label-width="120px">
        <el-input
          v-model="form.time_limit"
          style="width: 200px;"
          type="number"
          placeholder="请输入时间大小"
        />
      </el-form-item>
      <el-form-item label="内存限制:" label-width="120px">
        <el-input
          v-model="form.memory_limit"
          style="width: 200px;"
          type="number"
          placeholder="请输入内存大小"
        />
      </el-form-item>
      <el-form-item label="题目是否可做:" label-width="120px">
        <el-radio-group v-model="form.is_public" @change="changeStatus">
          <el-radio :label="false">不可做</el-radio>
          <el-radio :label="true">可做</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="题目公开状态:" label-width="120px">
        <el-radio-group v-model="form.is_visible" @change="changeStatuss">
          <el-radio :label="false">不公开</el-radio>
          <el-radio :label="true">公开</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题描述:" label-width="120px">
        <mavon-editor v-model="form.description" />
      </el-form-item>
      <el-form-item label="标题输入输出:" label-width="120px">
        <div style="display: flex;">
          <mavon-editor v-model="form.input_description" style="width: 50%;" />
          <mavon-editor v-model="form.output_description" style="width: 50%;" />
        </div>
      </el-form-item>
      <el-form-item label="输入输出样例:" label-width="120px">
        <mavon-editor v-model="form.samples" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
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
      form: {
        alter_id: 0,
        title: '',
        description: '',
        contest_id: '',
        is_public: null,
        input_description: '',
        output_description: '',
        samples: '',
        time_limit: null,
        memory_limit: null,
        is_visible: null
      },
      formLabelWidth: '100px'
    }
  },
  watch: {
    ruleform(_1, _2) {
      this.form.alter_id = _1.ID
      this.form.title = _1.title
      this.form.description = _1.description
      this.form.is_visible = _1.is_visible
      this.form.memory_limit = _1.memory_limit
      this.form.time_limit = _1.time_limit
      this.form.samples = _1.samples
      this.form.output_description = _1.output_description
      this.form.input_description = _1.input_description
      this.form.is_public = _1.is_public
    }
  },
  methods: {
    submit() {
      this.$emit('updateProblem', this.form)
      this.dialogVisible = false
    },
    changeStatus(item) {
      if (item === false) {
        this.form.is_public = false
      } else {
        this.form.is_public = true
      }
    },
    changeStatuss(item) {
      if (item === false) {
        this.form.is_visible = false
      } else {
        this.form.is_visible = true
      }
    }
  }
}
</script>

<style scoped>

</style>
