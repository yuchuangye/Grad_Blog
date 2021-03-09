<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'APP',
  created() {
    // 初始化vuex中的数据, 保持vuex和localstorage数据一致
    this.initState()
    // 获取用户信息
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['initState']),
    ...mapActions(['getUserInfo'])
  }
}
</script>

<style lang="scss">

</style>
