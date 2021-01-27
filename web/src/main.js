import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// 导入Scss样式文件
import './styles/index.scss'
// iconfont 使用svg图标需要引入的JS文件
import './assets/font/iconfont.js'

Vue.config.productionTip = false

// 全局注册 element-ui
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
