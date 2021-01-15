<template>
  <div id="goods-List">
    Hello Word to GoodsList...
    <div class="goods-details">
      <el-button type="success" 
      style="margin-top: 50px" 
      @click="$router.push('/goods/detail')">
      商品详情</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsList'
  }
</script>

<style lang="stylus" scoped>

</style>

