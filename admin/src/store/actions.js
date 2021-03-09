import router from '@/router'
import Vue from 'vue'

export default {
  // 重新登录
  reLogin({ commit }) {
    Vue.prototype.$message({ type: 'error', message: '登录过期 请重新登录！' })
    // 退出登录
    commit('logout')
    router.push({
      path: '/login',
      // 携带当前路由跳转到登录页 router.currentRoute是离开时的路由对象（from）
      query: { redirect: router.currentRoute.fullPath }
    })
  }
}
