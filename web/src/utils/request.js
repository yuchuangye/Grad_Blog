import axios from 'axios'
import store from '@/store'
import Vue from 'vue'

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 完整url = baseUrl + requestUrl
  timeout: 8000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(

  config => {
    const token = store.state.userData.access_token || ''
    // 携带token, 设置请求头
    config.headers['Authorization'] = 'Barery ' + token
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
    // 账号/密码错误, 文章/用户已存在...
    if (res.code === 1) {
      Vue.$message({ type: 'warning', msg: res.msg })
    }
    return res
  },

  error => {
    // 对响应错误做些什么
    const { status, data } = error.response
    switch (status) {
      // 401 未登录 -跳转登录页面，并携带当前页面的路径
      case 401:
        store.dispatch('reLogin')
        break
      // 403 登录过期, 提示用户并1s后跳转至登录页
      case 403:
        Vue.$message({ type: 'error', msg: '登录过期，请重新登录!' })
        setTimeout(() => { store.dispatch('reLogin') }, 1000)
        break
      // 404 请求资源不存在
      case 404:
        Vue.$message({ type: 'error', msg: '404 Not Found' })
        break
      // 422 参数类型不正确, 校验失败
      case 422:
        Vue.$message({ type: 'error', msg: '参数校验失败~' })
        break
      // 500 服务器错误
      case 500:
        Vue.$message({ type: 'error', msg: '服务器繁忙~' })
        break
      // 其它错误码
      default:
        Vue.$message({ type: 'error', msg: data.msg || data.message || data })
    }
    return Promise.reject(data)
  }

)

export default service
