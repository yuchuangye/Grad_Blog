<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'APP',
  created() {
    // 初始化vuex中的数据, 保持vuex和localstorage数据一致
    this.initState()
  },
  methods: {
    ...mapMutations(['initState'])
  }
}
</script>

<style lang="stylus">

</style>
