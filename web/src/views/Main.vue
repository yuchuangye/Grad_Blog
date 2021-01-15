<template>
  <div class="main">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'Main',
  components: {
    NavBar
  }
}
</script>

<style scoped lang="scss">

</style>
