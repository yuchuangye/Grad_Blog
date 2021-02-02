import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  isCollapse: false, // 控制侧边栏折叠
  access_token: '' // token
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
