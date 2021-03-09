import service from '@/utils/service'
import storage from '@/utils/storage'

export default {
  // 初始化 state 中的数据
  initState(state) {
    const str_state = ['access_token']
    for (const keyname in state) {
      const stateData = storage.getItem(keyname)
      // service模块用于深层次遍历对象设置值
      state[keyname] = service.extend(true, state[keyname], stateData)
      // 字符串类型的 state数据, 防止其被初始化为 {}
      if (typeof state[keyname] === 'object' && str_state.includes(keyname)) {
        state[keyname] = stateData || ''
      }
      storage.setItem(keyname, state[keyname])
    }
  },
  // 是否已登录
  hasLogin(state, hasLogin) {
    state.hasLogin = hasLogin
  },
  // 设置用户信息
  userInfo(state, userInfo) {
    const { _id = 'ObjectId', username = '', avatar = '' } = userInfo
    state.userInfo = { _id, username, avatar }
    storage.setItem('userInfo', state.userInfo)
  },
  // 登录成功
  login(state, data) {
    // 重置vuex相关数据
    const { _id, username, avatar } = data.user
    state.access_token = data.token
    state.hasLogin = true
    state.userInfo = { _id, username, avatar }
    storage.setItem('access_token', state.access_token)
    storage.setItem('userInfo', state.userInfo)
  },
  // 退出登录
  logout(state) {
    // 重置vuex相关数据
    state.access_token = ''
    state.hasLogin = false
    state.userInfo = {
      _id: 'ObjectId',
      username: '',
      avatar: ''
    }
    storage.setItem('access_token', state.access_token)
    storage.setItem('userInfo', state.userInfo)
  }
}
