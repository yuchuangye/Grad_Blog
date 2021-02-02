import storage from '@/utils/storage'

export default {
  toggleCollapse(state, isCollapse) {
    state.isCollapse = isCollapse
  },
  // 初始化 token, 保持其在本地和vuex中一致
  initState(state) {
    const stateData = storage.getItem('access_token')
    state.access_token = stateData
    storage.setItem('access_token', state.access_token)
  },
  // 登录成功
  login(state, token) {
    // 重置vuex用户相关数据
    state.access_token = token
    storage.setItem('access_token', state.access_token)
  },
  // 退出登录
  logout(state) {
    // 重置vuex用户数据
    state.access_token = ''
    storage.setItem('access_token', state.access_token)
  }
}
