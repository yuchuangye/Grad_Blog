import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userData: {
    access_token: '', // token
    hasLogin: false, // 是否登陆
    userInfo: {
      id: 0, // 用户唯一ID
      name: '', // 用户名
      avatar: '', // 头像
      registerDate: '', // 注册时间
      job: '', // 职位
      introduce: '', // 个人简介
      follows: 0, // 关注的数量
      fans: 0 // 粉丝数量
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
