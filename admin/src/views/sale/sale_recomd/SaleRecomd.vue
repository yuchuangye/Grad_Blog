<template>
  <div id="sale-recomd">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SaleRecomd'
  }
</script>

<style lang="stylus" scoped>

</style>

