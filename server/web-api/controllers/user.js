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

		const { username } = ctx.request.body

		// 判断用户是否已存在
		const hasUser = await UserModel.findOne({ username })
		if (hasUser) { ctx.throw(409, '该用户已存在') }

		// 不存在即可新建
		await UserModel.create(ctx.request.body)
		// 查询用户
		const user = await UserModel.findOne({ username })

		ctx.body = res(0, '注册成功', { user })

	}
	
}