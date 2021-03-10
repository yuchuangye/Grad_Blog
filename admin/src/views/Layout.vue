<template>
  <div class="layout">
    <el-container style="height: 100vh;">

      <el-aside
        width="220px"
        :class="{
          'menu-collapse': $store.state.isCollapse,
          'menu-fold': isFold,
          'menu-open': isOpen,
          'menu-fold-transition': isFold && isTransition > 0
        }"
      >
        <slide-bar />
      </el-aside>

      <el-container>
        <el-header>
          <nav-bar :mobile="isFold" @openMenu="isOpen=true" />
        </el-header>
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>

    </el-container>

    <div v-if="isOpen" class="menu-bg" @click="isOpen=false" />
    <!-- 返回顶部按钮 -->
    <el-backtop target=".el-main" :visibility-height="400" />

  </div>
</template>

<script>
import SlideBar from '@/components/SlideBar'
import NavBar from '@/components/NavBar'
export default {
  name: 'Home',
  components: {
    SlideBar,
    NavBar
  },
  data() {
    return {
      isFold: false, // 屏幕是否 < 768
      isOpen: false, // 控制屏幕 < 768时的菜单展开
      isTransition: 0 // 侧边菜单是否添加过渡动画, 大于0时添加
    }
  },
  watch: {
    $route() {
      this.isOpen = false
    },
    isOpen() {
      if (this.isFold) this.isTransition++
    }
  },
  mounted() {
    this.monitor()
    window.addEventListener('resize', this.monitor)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.monitor, false)
  },
  methods: {
    // 判断浏览器窗口宽度
    monitor() {
      const deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      // 屏幕小于 768px 时 侧边菜单定位位移
      if (deviceWidth < 768) {
        this.isFold = true
        // 屏屏幕小于 768px 时, isCollapse始终为false
        this.$store.commit('toggleCollapse', false)
      } else {
        this.isTransition = 0
        this.isOpen = false
        this.isFold = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/variable.styl"
.layout
  .el-header
    position: relative
    background-color: $colorA
    height: 50px !important
    line-height: 50px
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08)

  .el-aside
    background-color: $colorC
    overflow: hidden
    transition: width .3s

  .el-main
    background-color: $colorA
    overflow-x: hidden

  .menu-collapse
    width: 64px !important

  .menu-fold
    position: fixed
    top: 0
    left: 0
    transform: translateX(-101%)
    z-index: 999
    height: 100%
  .menu-open
    transform: translateX(0)
  .menu-fold-transition
    transition: transform .3s

  .menu-bg
    position: fixed
    top: 0
    left: 0
    z-index: 990
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, .3)
</style>
