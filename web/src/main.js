import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

// 导入scss样式文件
import './styles/index.scss'
// iconfont使用svg图标时需要引入的JS文件
import './assets/font/iconfont'

// 全局注册 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
