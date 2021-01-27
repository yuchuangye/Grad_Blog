import request from '@/utils/request'

export default {
  // 注册用户
  register({ data }) {
    return request({
      url: `/register`,
      method: 'post',
      data
    })
  }
}
