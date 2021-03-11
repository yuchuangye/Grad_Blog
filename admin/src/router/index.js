import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import storage from '@/utils/storage'
import store from '@/store'
import admin from '@/api/admin'

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
        component: () => import('@/views/tag/tag-edit'),
        meta: { title: '新增标签', requireAuth: true }
      },
      {
        path: 'update/:id',
        name: 'tag-update',
        props: true,
        component: () => import('@/views/tag/tag-edit'),
        meta: { title: '更新标签', requireAuth: true }
      }
    ]
  },

  {
    path: '/user',
    component: () => import('@/views/Layout'),
    redirect: '/user/list',
    name: 'user',
    meta: { title: '用户管理' },
    children: [
      {
        path: 'secure',
        name: 'secure',
        component: () => import('@/views/user/user-secure'),
        meta: { title: '密保设置', requireAuth: true }
      }
    ]
  },

  {
    path: '/system',
    component: () => import('@/views/Layout'),
    redirect: '/system/admin-list',
    name: 'system',
    meta: { title: '系统设置' },
    children: [
      {
        path: 'admin-list',
        name: 'admin-list',
        component: () => import('@/views/system/admin-list'),
        meta: { title: '管理员列表', requireAuth: true }
      },
      {
        path: 'admin-add',
        name: 'admin-add',
        component: () => import('@/views/system/admin-edit'),
        meta: { title: '新增管理员', requireAuth: true }
      },
      {
        path: 'admin-update/:id',
        name: 'admin-update',
        props: true,
        component: () => import('@/views/system/admin-edit'),
        meta: { title: '更新管理员', requireAuth: true }
      },

      {
        path: 'ads-list',
        name: 'ads-list',
        component: () => import('@/views/system/ads-list'),
        meta: { title: '广告位列表', requireAuth: true }
      },
      {
        path: 'ads-add',
        name: 'ads-add',
        component: () => import('@/views/system/ads-edit'),
        meta: { title: '新增广告位', requireAuth: true }
      },
      {
        path: 'ads-update/:id',
        name: 'ads-update',
        props: true,
        component: () => import('@/views/system/ads-edit'),
        meta: { title: '更新广告位', requireAuth: true }
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

  /*
    导航进入一个路由：
      1、无需登录即可访问的路由
          ① 访问的是 wl 中的路由（一般是 login、register...）
             1. 已登录（这里是简单判断有无token）, 跳转到首页
             2. 未登录, next() 放行即可
          ② 不是 wl 中的路由, 直接 next() 放行即可
      2、需要登录才可以访问的路由

          ① 无 token
              携带当前访问路径重定向到登录页，并重置必要vuex和localstorage数据，同时要调用  NProgress.done()

          ② 有 token
            1、hasLogin为true, 代表token是有效的并且已经登录过了, next() 放行即可

            2、hasLogin为false
              ① 退出登录了或从未登录过, 即token是无效（乱写或过期）的, 验证请求会 响应 401
                那么需要在 catch() 里面重定向到登录页
                注意： 虽然 401 会触发 reLogin 的action, 但如何不在catch()里加下面的代码，
                      使用reLogin里的路由跳转在某些情况会出现无限重定向参数的bug
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                })
              ② 登录了，但刷新 vuex会把 hasLogin重置为false，所以每次刷新时都需要验证token
  */

  // 当前跳转的路由系列中存在需要登录状态的路由
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
      // 这里要关闭 进度条, 否则会有bug
      NProgress.done()
    } else {
      // token存在, hasLogin为false 时需要发请求验证token
      if (!store.state.hasLogin) {
        try {
          const res = await admin.auth()
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
    const wl = ['login']
    // 如果访问 wl 中的路由
    if (wl.includes(to.name)) {
      const token = storage.getItem('access_token')
      if (token) {
        document.title = '首页'
        // 已登录跳到首页
        next('/home')
        NProgress.done()
      } else {
        next()
      }
    }
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
