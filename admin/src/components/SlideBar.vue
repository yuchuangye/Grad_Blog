<template>
  <div class="slide-bar">

    <el-menu 
      router
      text-color="#bfcbd9"
      background-color="#304156"
      active-text-color="#409eff"
      :unique-opened="true"
      :default-active="$route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="/goods/list">商品列表</el-menu-item>
        <el-menu-item index="/goods/add">添加商品</el-menu-item>
        <el-menu-item index="/goods/brand">品牌管理</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="/order/list">
          <i class="el-icon-guide"></i>
          <span slot="title">订单列表</span>
        </el-menu-item>
        <el-menu-item index="/order/set">
          <i class="el-icon-setting"></i>
          <span slot="title">订单设置</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-help"></i>
          <span slot="title">营销管理</span>
        </template>
        <el-menu-item index="/sale/seckill">秒杀活动</el-menu-item>
        <el-menu-item index="/sale/adset">广告设置</el-menu-item>
        <el-submenu index="4-3">
          <span slot="title">推荐管理</span>
          <el-menu-item index="/sale/recomd/brand">品牌推荐</el-menu-item>
          <el-menu-item index="/sale/recomd/special">专题推荐</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="/permission">
        <i class="el-icon-question"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>

      <el-menu-item class="github-link">
        <a href="https://github.com/yuchuangye" target="_blank">
          <i class="el-icon-link"></i>
          <span slot="title">友情链接</span>
        </a>
      </el-menu-item>
     
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    computed: {
      isCollapse () {
        return this.$store.state.isCollapse
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../assets/stylus/variable.styl"
  .slide-bar

    .el-menu
      border: none

    .el-menu i
      color: $colorD
      margin-right: 10px 
    .el-menu .github-link i
      color: $colorD !important
    .el-menu .el-menu-item.is-active i
      color: $colorB

    .el-menu .el-submenu li,
    >>> .el-menu .el-submenu ul .el-submenu__title
      background-color: $colorF !important
    
    .el-menu .el-submenu li:hover
    >>> .el-menu .el-submenu ul .el-submenu__title:hover
      background-color: $colorG !important 

</style>