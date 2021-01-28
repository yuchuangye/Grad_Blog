const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config.js')
const res = require('../../utils/response.js')
const UserModel = require('../../models/user.js')

// 路由处理中间件
module.exports = {

	// 用户登录
	async login(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			password: { type: 'string', require: true }
		})

		const { username, password } = ctx.request.body

		// 查询该用户
		let user = await UserModel.findOne({ username }).select('+password')
		// 用户不存在
		if (!user) {  return ctx.body = res(1, '用户不存在') }
		// 用户存在，验证密码
		const isPassword = bcrypt.compareSync(password, user.password)
		// 密码错误
		if (!isPassword) { return ctx.body = res(1, '密码错误') }

		// 验证成功, 生成token, 有效期为10分钟
		const token = jwt.sign(
			{ _id: String(user._id), username: user.username }, 
			 secret, 
			{ expiresIn: 1000*60*10 }
		)

		user = await UserModel.findOne({ username })
		
		ctx.body = res(0, '登录成功', { token, user })

	},

	// 用户注册
	async register(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			password: { type: 'string', require: true },
			security: { type: 'string', require: true }
		})

		let { username } = ctx.request.body
		// 去除左右两端空格
		username = username.trim()
		if (!username) { ctx.throw(422, '参数不合法') }

		// 判断用户是否已存在
		const hasUser = await UserModel.findOne({ username })
		if (hasUser) { return ctx.body = res(1, '该用户已存在') }

		// 不存在即可新建
		await UserModel.create(ctx.request.body)

		ctx.body = res(0, '注册成功', { username })

	},

	// 更新用户基础信息
	async updateUserInfo(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			avatar: { type: 'string', require: true },
			job: { type: 'string', require: true },
			company: { type: 'string', require: true },
			introduce: { type: 'string', require: true },
		})
		// 获取当前登录的用户
		let { user } = ctx.state
		await UserModel.findByIdAndUpdate(user._id, ctx.request.body)
		user = await UserModel.findById(user._id)
		ctx.body = res(0, '修改用户信息成功', { user })
	},

	// 重置密码时的验证
	async authUser(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			security: { type: 'string', require: true }
		})
		// 根据用户名和密保查找用户
		const user = await UserModel.findOne(ctx.request.body)
		if (!user) { return ctx.body = res(1, '用户名或密保不正确') }
		ctx.body = res(0, '身份验证成功')		
	},

	// 重置密码
	async updateUserPassword(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			username: { type: 'string', require: true },
			password: { type: 'string', require: true },
			security: { type: 'string', require: true }
		})
		const { username, security, password } = ctx.request.body
		// 根据用户名和密保查找用户并更新密码
		const user = await UserModel.findOneAndUpdate({ username, security }, { password })
		if (!user) { return ctx.body = res(1, '用户名或密保不正确') }
		ctx.body = res(0, '修改密码成功')
	}
	
}