<template>
  <div class="error">
    <div class="img-wrap">
      <img class="img" src="../assets/404.png">
    </div>
    <div class="btn-wrap">
      <el-button type="primary" round class="btn" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="stylus" scoped>
.error
  .img-wrap
    width: 70%
    margin: 30px auto 50px auto
    font-size: 0
    text-align: center
    .img
      max-width: 100%
  .btn-wrap
    width: 70%
    text-align: center
    margin: auto
    .btn
      font-size: 18px
</style>

