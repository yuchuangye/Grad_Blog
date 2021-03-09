import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main'
import storage from '@/utils/storage'
import user from '@/api/user'
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
    component: () => import('@/views/user/Login'),
    meta: { title: '登录' }
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/Register'),
    meta: { title: '注册' }
  },

  {
    path: '/forgot',
    name: 'forgot',
    component: () => import('@/views/user/forgot-password'),
    meta: { title: '忘记密码' }
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
        meta: { title: '首页' }
      },
      {
        path: 'user/:id',
        name: 'user-page',
        props: true,
        component: () => import('@/views/user/Page'),
        meta: { title: '个人主页' }
      },
      {
        path: 'user/setting/profile',
        name: 'user-setting',
        component: () => import('@/views/user/Setting'),
        meta: { title: '个人资料', requireAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  // 路由改变时滚动到顶部，而返回上一级时滚动到之前位置
  scrollBehavior(to, from, savedPosition) {
    window.pageYOffset = 0
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(async(to, from, next) => {
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
    const token = storage.getItem('access_token')
    // token不存在
    if (!token) {
      next({
        path: '/login',
        // 将要跳转的路由携带过去，方便登录成功后重定向过去
        query: { redirect: to.fullPath }
      })
      // 重置 vuex 中的数据
      store.commit('logout')
    } else {
      // token存在, hasLogin为false 时需要发请求验证token
      if (!store.state.hasLogin) {
        try {
          const res = await user.auth()
          // 验证成功, token有效
          if (res.code === 0) {
            store.commit('hasLogin', true)
            next()
          }
        } catch (err) {
          // 接口报 401, 证明token无效（乱写或过期）
          next({
            path: '/login',
            // 将要跳转的路由携带过去，方便登录成功后重定向过去
            query: { redirect: to.fullPath }
          })
        }
      } else {
        // hasLogin 为true, 证明目前处于登录状态
        next()
      }      
    }
  } else {
    const wl = ['login', 'register', 'forgot']
    // 如果访问 wl 中的路由
    if (wl.includes(to.name)) {
      const token = storage.getItem('access_token')
      /* 
        如果处于首页再跳 wl 中的路由, 只会触发一次导航守卫, 
        此时 需要手动再设置一次 document.title = 'GRADBLOG'
      */
      if (token) {
        // 已登录跳到首页
        document.title = 'GRADBLOG'
        next('/home')
      } else {
        next()
      }
    } else {
      next()
    }
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
