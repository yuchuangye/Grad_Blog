import storage from '@/utils/storage'

export default {
  // 侧边栏折叠
  toggleCollapse(state, isCollapse) {
    state.isCollapse = isCollapse
  },
  // 是否已登录
  hasLogin(state, hasLogin) {
    state.hasLogin = hasLogin
  },
  // 初始化 state 中的数据
  initState(state) {
    state.access_token = storage.getItem('access_token')
    state.adminInfo = storage.getItem('adminInfo') || { username: 'admin', role: 'admin' }
    storage.setItem('access_token', state.access_token)
    storage.setItem('adminInfo', state.adminInfo)
  },
  // 登录成功
  login(state, data) {
    // 重置state中的数据
    state.access_token = data.token
    state.hasLogin = true
    state.adminInfo = data.admin
    storage.setItem('access_token', state.access_token)
    storage.setItem('adminInfo', state.adminInfo)
  },
  // 退出登录
  logout(state) {
    // 重置state中的数据
    state.access_token = ''
    state.hasLogin = false
    state.adminInfo = {
      username: 'admin',
      role: 'admin'
    }
    storage.setItem('access_token', state.access_token)
    storage.setItem('adminInfo', state.adminInfo)
  }
}
