import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  access_token: '', // token
  userInfo: {
    _id: 0, // 用户唯一ID
    username: '', // 用户名
    avatar: '', // 头像
    createTime: '', // 注册时间
    job: '', // 职位
    company: '', // 公司
    introduce: '' // 个人简介
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
