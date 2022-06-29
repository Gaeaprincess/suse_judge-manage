<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="Name" prop="admin_name">
        <el-input v-model="form.admin_name" />
      </el-form-item>
      <el-form-item label="Password" prop="admin_password">
        <el-input v-model="form.admin_password" type="password" />
      </el-form-item>
      <el-form-item label="PasswordAgain" prop="readmin_password">
        <el-input v-model="form.readmin_password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">Update</el-button>
      </el-form-item>
    </el-form>
    <div class="post">
      <div class="user-images">
        <el-carousel :interval="2000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item+carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { userUpdate } from '@/api/user'
const carouselPrefix = '?imageView2/2/h/440'
export default {
  data() {
    const checkAdmin_name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the adminName'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (this.form.admin_password.length < 8) {
        callback(new Error('Length should be more 8'))
      } else {
        if (this.form.readmin_password !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.admin_password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }
    return {
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      carouselPrefix,
      form: {
        admin_name: '',
        admin_password: '',
        readmin_password: ''
      },
      updateform: {
        admin_name: '',
        admin_password: ''
      },
      rules: {
        admin_password: [{ validator: validatePass, trigger: 'blur' }, { min: 8, max: 12 }],
        readmin_password: [{ validator: validatePass2, trigger: 'blur' }, { min: 8, max: 12 }],
        admin_name: [{ validator: checkAdmin_name, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.form.admin_name = localStorage.getItem('admin_name')
  },
  methods: {
    submit() {
      this.updateform.admin_name = this.form.admin_name
      this.updateform.admin_password = this.form.admin_password
      userUpdate(this.updateform).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
      // this.$message({
      //   message: 'User information has been updated successfully',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
    }
  }
}
</script>

<style>
  /* .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }
  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  } */

</style>
