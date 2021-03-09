<template>
  <div class="main">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'Main',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>

</style>
