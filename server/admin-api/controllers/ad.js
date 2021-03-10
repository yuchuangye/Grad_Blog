const res = require('../../utils/response')
const AdModel = require('../../models/ad')

// 路由处理函数
module.exports = {

  // 获取广告位列表
  async adList(ctx, next) {
    const adList = await AdModel.find()
    ctx.body = res(0, '获取广告位成功', { adList })
  },

  // 获取广告位详情
  async itemAd(ctx, next) {
    const { id } = ctx.request.params
    const ad = await AdModel.findById(id)
    if (!ad) { return ctx.body = res(1, '广告位不存在') }
    ctx.body = res(0, '获取广告位详情成功', { ad })
  },

  // 添加广告位
  async addAd(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', required: true },
			items: { type: 'array', required: true }
    })
    const { name, items } = ctx.request.body
    let ad = await AdModel.findOne({ name })
    // 该名字的广告位已存在
    if (ad) { return ctx.body = res(1, '广告位已存在') }
    // 创建新广告位
    ad = await AdModel.create({ name, items })
    ctx.body = res(0, '新增广告位成功', { ad })    
  },

  // 更新广告位
  async updateAd(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', required: true },
			items: { type: 'array', required: true }
    })
    const { id } = ctx.request.params
    const { name, items } = ctx.request.body
    let ad = await AdModel.findOne({ name })
    // 该名字的广告位已存在
    if (ad && ad._id.toString() !== id) { return ctx.body = res(1, '广告位已存在') }
    // 修改广告位
    await AdModel.findByIdAndUpdate(id, { name, items })
    // 获取修改后的广告位信息
    ad = await AdModel.findById(id)
    ctx.body = res(0, '修改广告位成功', { ad })   
  },

  // 删除广告位
  async delAd(ctx, next) {
    const { id } = ctx.request.params
    let ad = await AdModel.findById(id)
    if (!ad) { return ctx.body = res(1, '广告位不存在') }
    // 删除广告位
    ad = await AdModel.findByIdAndDelete(id)
    ctx.body = res(0, '删除广告位成功', { ad })    
  }

}