import request from '@/utils/request'

export default {
  // 新建问题
  addQuestion({ data }) {
    return request({
      url: '/question',
      method: 'post',
      data
    })
  },
  updateQuesion({ id, data }) {
    return request({
      url: `/question/${id}`,
      method: 'put',
      data
    })
  }
}
