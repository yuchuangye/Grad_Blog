import request from '@/utils/request'

export default {
  // 修改分类
  updateUser(data = {}) {
    return request({
      url: 'user/update',
      method: 'put',
      data
    })
  }
}
