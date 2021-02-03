import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import storage from '@/utils/storage.js'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 完整url = baseUrl + requestUrl
  timeout: 8000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(

  config => {
    const token = storage.getItem('access_token')
    // 携带token, 设置请求头
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  },

  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }

)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data
    // 账号/密码错误, 用户/文章/问题 已存在...
    if (res.code === 1) { Vue.prototype.$message({ type: 'error', message: res.msg }) }
    return res
  },

  error => {
    // 对响应错误做些什么
    const { status, data } = error.response
    switch (status) {
      // 401 未登录(无token/token无效/过期) -跳转登录页面，并携带当前页面的路径
      case 401:
        Vue.prototype.$message({ type: 'error', message: '登录过期 请重新登录！' })
        store.dispatch('reLogin')
        break
      // 403 验证是通过的, 但没权限访问该接口
      case 403:
        Vue.prototype.$message({ type: 'error', message: '你没有权限执行此操作！' })
        break
      // 404 请求资源不存在
      case 404:
        Vue.prototype.$message({ type: 'error', message: '404 Not Found' })
        break
      // 500 服务器错误
      case 500:
        Vue.prototype.$message({ type: 'error', message: '服务器繁忙~' })
        break
      // 其它错误码(405, 422......)
      default:
        console.log(data.msg || data.message || data || 'Unknown Error')
    }
    return Promise.reject(data)
  }

)

export default service
