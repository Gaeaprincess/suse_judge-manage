<template>
  <div class="dashboard-editor-container">
    <div class="clearfix" style="margin-bottom: 100px">
      <pan-thumb :image="avatar" style="float: left">
        <span v-for="item in roles" :key="item" class="pan-info-roles" style="font-size:large; margin-top: 35px;">{{ item }}</span>
      </pan-thumb>
      <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" /> -->
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Welcome to SUSE JUDGE</span>
      </div>
    </div>

    <div class="mixin-components-container">
      <el-row>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>快捷键</span>
          </div>
          <div style="margin-bottom:50px;">
            <el-col :span="6" class="text-center">
              <router-link class="pan-btn blue-btn" to="/permission/directive">
                用户管理
              </router-link>
            </el-col>
            <el-col :span="6" class="text-center">
              <router-link class="pan-btn light-blue-btn" to="/contest/manage">
                竞赛管理
              </router-link>
            </el-col>
            <el-col :span="6" class="text-center">
              <router-link class="pan-btn pink-btn" to="/notice/manage">
                公告管理
              </router-link>
            </el-col>
            <el-col :span="6" class="text-center">
              <router-link class="pan-btn green-btn" to="/market/goods">
                商城
              </router-link>
            </el-col>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import waves from '@/directive/waves/index.js' // 水波纹指令
export default {
  name: 'DashboardEditor',
  components: {
    PanThumb
  },
  directives: {
    waves
  },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: rgb(240,242,245);
    min-height: calc(100vh - 84px);
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
