<template>
  <div class="nav-bar">
    <div class="fold-icon-wrap" @click="toggleMenuCollapse">
      <i v-if="!isCollapse" class="el-icon-s-unfold" />
      <i v-if="isCollapse" class="el-icon-s-fold" />
    </div>

    <bread-crumb @hideAvatar="isAvatar=false" @showAvatar="isAvatar=true" />

    <div v-if="isAvatar" class="dropdown-wrap">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            shape="square"
            size="medium"
            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2159143452,2918152275&fm=26&gp=0.jpg"
          />
          <i class="el-icon-caret-bottom" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="true" class="adminname">{{ adminName }}</el-dropdown-item>
          <el-dropdown-item :divided="true" command="dashboard">首页</el-dropdown-item>
          <el-dropdown-item :divided="true" command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'NavBar',
  components: {
    BreadCrumb
  },
  props: {
    mobile: { type: Boolean, default: false }
  },
  data() {
    return {
      isAvatar: true // 控制头像的显示
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse
    },
    // 管理员名字
    adminName() {
      return this.$store.state.adminInfo.username
    }
  },
  methods: {
    // 侧边栏折叠切换
    toggleMenuCollapse() {
      // 如果当前屏幕宽度 < 768(参考 bootstrap 移动设备)
      if (this.mobile) {
        this.$store.commit('toggleCollapse', false)
        this.$emit('openMenu')
        return
      }
      this.$store.commit('toggleCollapse', !this.isCollapse)
    },
    // 点击菜单项触发事件
    handleCommand(command) {
      if (command === 'none') return
      command === 'logout' ? this.logout() : this.$router.push('/home')
    },
    // 退出登录
    logout() {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/variable.styl"
.nav-bar
  height: 50px
  .fold-icon-wrap
    float: left
    i
      width: 20px
      height: 20px
      font-size: $font-sm
      cursor: pointer
  .dropdown-wrap
    float: right
    height: 50px
    cursor: pointer
    .el-dropdown-link
      display: flex
      align-items: center
      height: 50px
      i
        position: relative
        top: 8px
    .el-avatar--square
      border-radius: 10px
      margin-right: 10px
</style>
