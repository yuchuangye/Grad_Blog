import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { hasToken } from '../utils/auth'


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
    component: () => import('@/views/404'),
    meta: { title: '404' }
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
        meta: { title: '首页' }
      }, 
      {
        path: '/permission',
        name: 'permission',
        component: () => import('@/views/permission/permission'),
        meta: { title: '权限管理' }
      }
    ]
  },

  {
    path: '/goods',
    component: () => import('@/views/Layout'),
    redirect: '/goods/list',
    name: 'goods',
    meta: { title: '商品管理' },
    children: [
      {
        path: 'list',
        name: 'goods-list',
        component: () => import('@/views/goods/GoodsList'),
        meta: { title: '商品列表页面' }
      }, 
      {
        path: 'add',
        name: 'goods-add',
        component: () => import('@/views/goods/GoodsAdd'),
        meta: { title: '添加商品' }
      },
      {
        path: 'brand',
        name: 'goods-brand',
        component: () => import('@/views/goods/GoodsBrand'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'detail',
        name: 'goods-detail',
        component: () => import('@/views/goods/GoodsDetail'),
        meta: { title: '商品详情' }
      }
    ]
  },

  {
    path: '/order',
    component: () => import('@/views/Layout'),
    redirect: '/order/list',
    name: 'order',
    meta: { title: '订单管理' },
    children: [
      {
        path: 'list',
        name: 'order-list',
        component: () => import('@/views/order/OrderList'),
        meta: { title: '订单列表' }
      }, 
      {
        path: 'set',
        name: 'order-set',
        component: () => import('@/views/order/OrderSet'),
        meta: { title: '订单设置' }
      }
    ]
  },

  {
    path: '/sale',
    component: () => import('@/views/Layout'),
    redirect: '/sale/seckill',
    name: 'sale',
    meta: { title: '营销管理' },
    children: [
      {
        path: 'seckill',
        name: 'sale-seckill',
        component: () => import('@/views/sale/SaleSeckill'),
        meta: { title: '秒杀活动' }
      }, 
      {
        path: 'adset',
        name: 'sale-adset',
        component: () => import('@/views/sale/SaleAdset'),
        meta: { title: '广告设置' }
      },
      {
        path: 'recomd',
        name: 'sale-recomd',
        redirect: '/sale/recomd/brand',
        component: () => import('@/views/sale/sale_recomd/SaleRecomd'),
        meta: { title: '推荐管理' },
        children: [
          {
            path: 'brand',
            name: 'recomd-brand',
            component: () => import('@/views/sale/sale_recomd/RecomdBrand'),
            meta: { title: '品牌推荐页面测试' }
          },
          {
            path: 'special',
            name: 'recomd-special',
            component: () => import('@/views/sale/sale_recomd/RecomdSpecial'),
            meta: { title: '专题推荐' }
          },
        ]
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 启动加载条
  NProgress.start()
  // 动态设置标题
  document.title = to.meta.title ? to.meta.title : 'cy-admin'
  
  // 验证token是否有效
  const token = await hasToken()

  if (token) {
    // token有效
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    // token无效
    if ('/login'.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
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
