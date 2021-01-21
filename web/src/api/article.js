import request from '@/utils/request'

export default {
  // 获取文章列表
  getArticle({ params }) {
    return request({
      url: '/article',
      method: 'get',
      params
    })
  },
  // 获取文章详情
  getArticleItem({ id, params }) {
    return request({
      url: `/article/${id}`,
      method: 'get',
      params
    })
  }
}
