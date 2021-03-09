import router from '@/router'
import Vue from 'vue'
import user from '@/api/user'
import storage from '@/utils/storage'

export default {
  // 重新登录
  reLogin({ commit }) {
    Vue.prototype.$notify({ type: 'error', title: '错误', message: '登录过期 请重新登录！' })
    // 退出登录
    commit('logout')
    router.push({
      path: '/login',
      // 将当前路由携带过去，方便登录成功后跳转回去
      query: { redirect: router.currentRoute.fullPath }
    })
  },
  // 获取用户信息
  getUserInfo({ commit }) {
    const userInfo = storage.getItem('userInfo')
    return new Promise((resolve, reject) => {
      user.getUserInfo({ id: userInfo._id || 0 }).then(res => {
        const user = res.data.user
        // 修改 vuex 中的用户信息
        commit('userInfo', user || {})
        resolve()
      }).catch(err => reject() )            
    })
  }
}
