import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [

  {
    path: '*',
    name: '404',
    component: () => import('@/views/Error'),
    meta: { title: '404 Not Found' }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: { title: '注册' }
  },

  {
    path: '/',
    name: 'Main',
    redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', requireAuth: false }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  // 路由改变时滚动到顶部，而返回上一级时滚动到之前位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // 动态设置标题
  if (to.matched.length === 1) {
    // 一级路由
    document.title = to.meta.title
  } else {
    if (to.path !== '/home') {
      // 不是首页
      document.title = to.meta.title ? 'GRADBLOG - ' + to.meta.title : 'GRADBLOG'
    } else {
      document.title = 'GRADBLOG'
    }
  }

  // 当前路由跳转的系列中存在需要验证 token的路由
  if (to.matched.some(auth => auth.meta.requireAuth)) {
    const token = store.userData.access_token
    // token不存在
    if (!token) {
      next({
        path: '/login',
        // 将当前路由的携带过去，方便登录成功后跳转回去
        query: { redirect: to.fullPath }
      })
    } else {
      // token存在。 至于其有效与否, 放在响应拦截器中处理
      next()
    }
  } else {
    // 不需要验证token, 直接放行
    next()
  }
})

router.afterEach(() => {
  console.log('路由发生了跳转...')
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
