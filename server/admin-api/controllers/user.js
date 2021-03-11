const res = require('../../utils/response')
const SecureModel = require('../../models/secure')

// 路由处理函数
module.exports = {

  // 获取密保问题列表
  async secureList(ctx, next) {
    const secureList = await SecureModel.find()
    ctx.body = res(0, '获取密保问题列表成功', { secureList })
  },

  // 获取密保问题详情
  async itemSecure(ctx, next) {
    const { id } = ctx.request.params
    const secure = await SecureModel.findById(id)
    if (!secure) { return ctx.body = res(1, '密保问题不存在') }
    ctx.body = res(0, '获取密保问题详情成功', { secure })
  },

  // 添加密保问题
  async addSecure(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', required: true }
    })
    const { name } = ctx.request.body
    let secure = await SecureModel.findOne({ name })
    // 该名字的密保问题已存在
    if (secure) { return ctx.body = res(1, '密保问题已存在') }
    // 创建新密保问题
    secure = await SecureModel.create({ name })
    ctx.body = res(0, '新增密保问题成功', { secure })  
  },

  // 更新密保问题
  async updateSecure(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', required: true }
    })
    const { id } = ctx.request.params
    const { name } = ctx.request.body
    let secure = await SecureModel.findOne({ name })
    // 该名字的密保问题已存在
    if (secure && secure._id.toString() !== id) { return ctx.body = res(1, '密保问题已存在') }
    // 修改密保问题
    await SecureModel.findByIdAndUpdate(id, { name })
    // 获取修改后的密保问题位信息
    secure = await SecureModel.findById(id)
    ctx.body = res(0, '修改密保问题成功', { secure })   
  },

  // 删除密保问题
  async delSecure(ctx, next) {
    const { id } = ctx.request.params
    let secure = await SecureModel.findById(id)
    if (!secure) { return ctx.body = res(1, '密保问题不存在') }
    // 删除密保问题
    secure = await SecureModel.findByIdAndDelete(id)
    ctx.body = res(0, '删除密保问题成功', { secure })    
  }

}