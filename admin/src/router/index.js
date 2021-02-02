import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import storage from '@/utils/storage.js'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },

  {
    path: '*',
    name: '404',
    component: () => import('@/views/Error'),
    meta: { title: '404 Not Found' }
  },

  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', requireAuth: true }
      }
    ]
  },

  {
    path: '/tag',
    component: () => import('@/views/Layout'),
    redirect: '/tag/list',
    name: 'tag',
    meta: { title: '标签管理' },
    children: [
      {
        path: 'list',
        name: 'tag-list',
        component: () => import('@/views/tag/tag-list'),
        meta: { title: '标签列表', requireAuth: true }
      },
      {
        path: 'add',
        name: 'tag-add',
        component: () => import('@/views/tag/tag-add'),
        meta: { title: '新增标签', requireAuth: true }
      }
    ]
  },

  {
    path: '/user',
    component: () => import('@/views/Layout'),
    redirect: '/user/list',
    name: 'user',
    meta: { title: '管理员管理' },
    children: [
      {
        path: 'list',
        name: 'user-list',
        component: () => import('@/views/user/user-list'),
        meta: { title: '管理员列表', requireAuth: true }
      },
      {
        path: 'add',
        name: 'user-add',
        component: () => import('@/views/user/user-add'),
        meta: { title: '新增管理员', requireAuth: true }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach(async(to, from, next) => {
  // 启动加载条
  NProgress.start()
  // 动态设置标题
  document.title = to.meta.title ? to.meta.title : 'GRADBLOG-ADMIN'

  // 当前路由跳转的系列中存在需要验证 token的路由
  if (to.matched.some(auth => auth.meta.requireAuth)) {
    const token = storage.getItem('access_token')

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
  NProgress.done()
})

// 禁止相同路由跳转时打印错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
