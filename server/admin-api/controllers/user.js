const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { adminSecret } = require('../../config.js')
const res = require('../../utils/response.js')
const AdminModel = require('../../models/admin.js')

// 路由处理函数
module.exports = {

	// 后台登录
	async login(ctx, next) {
				// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			password: { type: 'string', require: true }
		})

		const { username, password } = ctx.request.body

		// 查询该管理员
		let admin = await AdminModel.findOne({ username }).select('+password')
		// 管理员不存在
		if (!admin) {  return ctx.body = res(1, '用户不存在') }
		// 管理员存在，验证密码
		const isPassword = bcrypt.compareSync(password, admin.password)
		// 密码错误
		if (!isPassword) { return ctx.body = res(1, '密码错误') }

		// 验证成功, 生成token, 有效期为100分钟
		const token = jwt.sign(
			{ _id: String(admin._id), username: admin.username, role: admin.role }, 
			 adminSecret, 
			{ expiresIn: 1000*60*100 }
		)

		admin = await AdminModel.findOne({ username })
		
		ctx.body = res(0, '登录成功', { token, admin })
	},

	// 获取管理员列表
	async adminList(ctx, next) {
		const adminList = await AdminModel.find()
		ctx.body = res(0, '获取管理员列表成功', { adminList })
	},

	// 获取某个管理员
	async itemAdmin(ctx, next) {
		const { id } = ctx.request.params
		const admin = await AdminModel.findById(id)
		if (!admin) { return ctx.body = res(1, '该管理员不存在') }
		ctx.body = res(0, '获取管理员成功', { admin })
	},

	// 添加管理员
	async addAdmin(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			password: { type: 'string', require: true },
			role: { type: 'string', require: true }
		})
		let { username, role } = ctx.request.body
		// 去除左右两端空格
		username = username.trim()
		if (!username || !['admin', 'visitor'].includes(role)) { ctx.throw(422, '参数不合法') }

		// 判断用户是否已存在
		const hasAdmin = await AdminModel.findOne({ username })
		if (hasAdmin) { return ctx.body = res(1, '该管理员已存在') }

		// 不存在即可新建
		await AdminModel.create(ctx.request.body)
		// create方法创建后返回的是包含密码字段的，所以需要重新查询
		const admin = await AdminModel.findOne({ username })

		ctx.body = res(0, '新增管理员成功', { admin })		
	},

	// 更新管理员
	async updateAdmin(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			password: { type: 'string', require: false },
			role: { type: 'string', require: false }
		})

		let { password, role } = ctx.request.body
		const { id } = ctx.request.params

		let hasAdmin = await AdminModel.findById(id)
		// 要更新的管理员不存在
		if(!hasAdmin) { return ctx.body = res(1, '该管理员不存在') }
		
		// 管理员角色不符合要求
		if (!['admin', 'visitor'].includes(role)) { ctx.throw(422, '参数不合法') }

		hasAdmin = await AdminModel.findOne({ username })
		// 该名字的管理员已存在
		if (hasAdmin) { return ctx.body = res(1, '该管理员已存在') }

	  await AdminModel.findByIdAndUpdate(id, { username, role })
		// 因为 findByIdAndUpdate() 返回的是更新前的信息, 所以需要再查一遍
		const admin = await AdminModel.findById(id)
		ctx.body = res(0, '更新管理员成功', { admin })		
	},

	// 删除管理员
	async delAdmin(ctx, next) {
		const { id } = ctx.request.params

		const hasAdmin = await AdminModel.findById(id)
		// 要删除的管理员不存在
		if(!hasAdmin) { return ctx.body = res(1, '该管理员不存在') }

		const admin = await AdminModel.findByIdAndDelete(id) 
		ctx.body = res(0, '删除管理员成功', { admin })
	}
	
}