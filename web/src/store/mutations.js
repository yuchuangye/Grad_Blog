import service from '@/utils/service'
import storage from '@/utils/storage'

export default {
  // 初始化 state 中的数据
  initState(state) {
    for (const keyname in state) {
      const stateData = storage.getItem(keyname)
      // service模块用于深层次遍历对象设置值
      state[keyname] = service.extend(true, state[keyname], stateData)
      storage.setItem(keyname, state[keyname])
    }
  },
  // 退出登录
  logout(state) {
    // 重置用户数据
    state.userData.access_token = ''
    state.userData.hasLogin = false
    state.userData.userInfo = {
      id: 0, // 用户唯一ID
      name: '游客', // 用户名
      avatar: '', // 头像
      registerDate: '', // 注册时间
      job: '', // 职位
      introduce: '', // 个人简介
      follows: 0, // 关注的数量
      fans: 0 // 粉丝数量
    }
    storage.setItem('userData', state.userData)
  }
}
