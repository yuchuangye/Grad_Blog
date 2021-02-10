import router from '@/router'
import Vue from 'vue'

export default {
  // 重新登录
  reLogin({ commit }) {
    // 退出登录
    Vue.prototype.$message({ type: 'error', message: '登录过期 请重新登录！' })
    commit('logout')
    router.push({
      path: '/login',
      // 将要跳转的路由携带过去，方便登录成功后重定向过去
      query: { redirect: router.currentRoute.fullPath }
    })
  }
}
