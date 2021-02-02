import request from '@/utils/request'

export default {
  // 管理员登录
  login({ data }) {
    return request({
      url: '/login',
      method: 'post',
      data
    })
  },
  // 新增管理员
  addAdmin({ data }) {
    return request({
      url: '/admin',
      method: 'post',
      data
    })
  },
  // 更新管理员
  updateAdmin({ id, data }) {
    return request({
      url: `/admin/${id}`,
      method: 'put',
      data
    })
  },
  // 删除管理员
  delAdmin({ id, params }) {
    return request({
      url: `/admin/${id}`,
      method: 'delete',
      params
    })
  },
  // 获取管理员列表
  adminList({ params }) {
    return request({
      url: '/admin',
      method: 'get',
      params
    })
  },
  // 获取某个管理员
  itemAdmin({ id, params }) {
    return request({
      url: `/admin/${id}`,
      method: 'get',
      params
    })
  }
}
