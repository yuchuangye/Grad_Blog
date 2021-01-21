import request from '@/utils/request'

export default {
  // 删除用户
  deleteUser({ id, params }) {
    return request({
      url: `/user/${id}`,
      method: 'delete',
      params
    })
  }
}
