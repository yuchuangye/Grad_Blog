import request from '@/utils/request'

export default {
  // 新增密保问题
  addSecure({ data }) {
    return request({
      url: '/secure',
      method: 'post',
      data
    })
  },
  // 更新密保问题
  updateSecure({ id, data }) {
    return request({
      url: `/secure/${id}`,
      method: 'put',
      data
    })
  },
  // 删除密保问题
  delSecure({ id }) {
    return request({
      url: `/secure/${id}`,
      method: 'delete'
    })
  },
  // 获取密保问题列表
  secureList() {
    return request({
      url: '/secure',
      method: 'get'
    })
  },
  // 获取某个密保问题
  itemSecure({ id }) {
    return request({
      url: `/secure/${id}`,
      method: 'get'
    })
  }
}
