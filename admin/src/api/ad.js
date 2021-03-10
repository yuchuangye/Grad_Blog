import request from '@/utils/request'

export default {
  // 新增广告位
  addAd({ data }) {
    return request({
      url: '/ad',
      method: 'post',
      data
    })
  },
  // 更新广告位
  updateAd({ id, data }) {
    return request({
      url: `/ad/${id}`,
      method: 'put',
      data
    })
  },
  // 删除广告位
  delAd({ id }) {
    return request({
      url: `/ad/${id}`,
      method: 'delete'
    })
  },
  // 获取广告位列表
  adList() {
    return request({
      url: '/ad',
      method: 'get'
    })
  },
  // 获取某个广告位
  itemAd({ id }) {
    return request({
      url: `/ad/${id}`,
      method: 'get'
    })
  }
}
