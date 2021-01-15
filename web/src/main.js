import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局导入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入全局样式
import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
