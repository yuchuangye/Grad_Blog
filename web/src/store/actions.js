import router from '@/router'

export default {
  // 重新登录
  reLogin({ commit }) {
    commit('logout')
    router.redirect({
      path: '/login',
      // 将当前路由的携带过去，方便登录成功后跳转回去
      query: { redirect: router.currentRoute.fullPath }
    })
  }
}
