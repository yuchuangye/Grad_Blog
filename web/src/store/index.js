import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  access_token: '', // token
  hasLogin: false, // 是否已登录
  userInfo: {
    _id: 'ObjectId', // 用户唯一ID
    username: '', // 用户名
    avatar: '' // 头像
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
