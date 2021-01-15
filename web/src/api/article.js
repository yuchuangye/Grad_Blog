import request from '@/utils/request'

export default {
  // 首页轮播广告
  getArticle(params = {}) {
    return request({
      url: 'article/list',
      method: 'get',
      params
    })
  }
}
