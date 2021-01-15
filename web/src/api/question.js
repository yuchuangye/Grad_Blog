import request from '@/utils/request'

export default {
  // 添加分类
  addQuestion(data = {}) {
    return request({
      url: 'question/add',
      method: 'post',
      data
    })
  }
}
