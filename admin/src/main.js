import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'nprogress/nprogress.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局导入 stylus 样式文件
import '@/stylus/index.styl'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
