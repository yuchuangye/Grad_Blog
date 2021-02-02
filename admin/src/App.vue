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
    // 首次加载或刷新时初始化 vuex 中的数据
    this.initState()
  },
  methods: {
    ...mapMutations(['initState'])
  }
}
</script>

<style lang="stylus">

</style>
