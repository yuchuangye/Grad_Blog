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
      if (typeof state[keyname] === 'object' 
          && str_state.includes(keyname)) {
        state[keyname] = stateData || ''
      }
      storage.setItem(keyname, state[keyname])
    }
  },
  // 登录成功
  login(state, data) {
    // 重置vuex用户相关数据
    state.access_token = data.token
    state.userInfo = data.user
    storage.setItem('access_token', state.access_token)    
    storage.setItem('userInfo', state.userInfo)    
  },
  // 退出登录
  logout(state) {
    // 重置vuex用户数据
    state.access_token = ''
    state.userInfo = {
      _id: 0, // 用户唯一ID
      username: '', // 用户名
      avatar: '', // 头像
      createTime: '', // 注册时间
      job: '', // 职位
      company: '', // 公司
      introduce: '' // 个人简介
    }
    storage.setItem('access_token', state.access_token)    
    storage.setItem('userInfo', state.userInfo)
  }
}
