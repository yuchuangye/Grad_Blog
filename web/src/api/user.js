import request from '@/utils/request'

export default {
  // 注册用户
  register({ data }) {
    return request({
      url: '/register',
      method: 'post',
      data
    })
  },
  // 用户登录
  login({ data }) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },
  // 重置密码身份验证
  resetAuth({ data }) {
    return request({
      url: '/user/reset-auth',
      method: 'post',
      data
    })
  },
  // 重置密码
  resetPassword({ data }) {
    return request({
      url: '/user/reset-password',
      method: 'put',
      data
    })
  },
  // 验证 token 的有效性
  auth() {
    return request({
      url: '/auth',
      method: 'post'
    })
  },
  // 获取用户信息
  getUserInfo({ id }) {
    return request({
      url: `/user/${id}`,
      method: 'get'
    })
  },
  // 获取密保问题列表
  getSecureList() {
    return request({
      url: '/secure',
      method: 'get'
    })
  }  
}
