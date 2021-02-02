<template>
  <div v-if="isBread" class="bread-crumb">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path">
          <span
            v-if="item.redirect==='noRedirect'||index==breadList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <a v-else class="yes-redirect" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {
      breadList: null, // 面包屑数据
      isBread: true // 控制面包屑的显示
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
      this.handleBreadCrumb()
    }
  },
  mounted() {
    this.getBreadcrumb()
    this.handleBreadCrumb()
  },
  methods: {
    // 动态生成面包屑
    getBreadcrumb() {
      this.isBread = true

      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isHome(first)) matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
      this.breadList = matched
    },
    // 判断是否是首页
    isHome(route) {
      const name = route && route.name
      if (!name) return false
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },
    // 处理面包屑路由跳转
    handleLink(item) {
      const { redirect } = item
      redirect ? this.$router.push(redirect) : this.$router.push('/home')
    },
    // 控制面包屑和头像在不同屏幕宽度下的显示和隐藏
    handleBreadCrumb() {
      const deviceWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.$nextTick(() => {
        const breadWidth = document.querySelector('.bread-crumb').clientWidth
        const rateDB = Number((breadWidth / deviceWidth).toFixed(3))

        if (rateDB <= 0.643) {
          this.isBread = true
          this.$emit('showAvatar')
        } else if (rateDB > 0.643 && rateDB < 0.816) {
          this.isBread = true
          this.$emit('hideAvatar')
        } else {
          this.isBread = false
          this.$emit('showAvatar')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/variable.styl"
.bread-crumb
  float: left
  height: 50px
  .el-breadcrumb
    font-size: $font-xxs
    line-height: 50px
    margin-left: 15px
    margin-top: -2px
    .no-redirect
      color: $colorH
      cursor: text
    .yes-redirect
      font-weight: normal
</style>
