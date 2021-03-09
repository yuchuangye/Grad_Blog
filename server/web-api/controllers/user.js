const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { webSecret } = require('../../config.js')
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

		// 验证成功, 生成token, 有效期为100分钟, 数值被解析成秒计算
		const token = jwt.sign(
			{ _id: String(user._id), username: user.username }, 
			 webSecret, 
			{ expiresIn: 60*100 }
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

	// 验证 token 的有效性
	async auth(ctx, next) {
		// 验证成功
		ctx.body = res(0, 'token有效')
	},	
	
	// 获取用户信息
	async getUserInfo(ctx, next) {
		const { id } = ctx.request.params
		let user
		try {
			// id符合 mongoose 规范
			user = await UserModel.findById(id)
			if (user) {
				ctx.body = res(0, '获取用户信息成功', { user })
			} else {
				ctx.body = res(2, '用户不存在')
			}
		} catch (err) {
			// id不符合 mongoose 规范
			ctx.body = res(2, '参数不正确')
		}
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
	async resetAuth(ctx, next) {
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
	},

	// 获取关注列表
	async followingList(ctx, next) {
		const { id } = ctx.request.params
		// 查找要获取粉丝列表的用户，并关联查询关注者的详细信息
		const user = await UserModel.findById(id).select('+following').populate('following')
		// 用户不存在
		if (!user) { return ctx.body = res(1, '参数不合法') }

		ctx.body = res(0, '获取关注列表成功', user.following)
	},

	// 获取粉丝列表
	async followersList(ctx, next) {
		const { id } = ctx.request.params
		const followers = await UserModel.find({ following: id })
		ctx.body = res(0, '获取粉丝列表成功', followers)
	},

	// 关注某人
	async followUser(ctx, next) {
		// 被关注者ID
		const { id } = ctx.request.params
		// 关注者ID
		const { _id } = ctx.state.user
		// 查找关注者的信息
		const me = await UserModel.findById(_id).select('+following')
		const you = await UserModel.findById(id)
		// 被关注者不存在 或 关注的是自己
		if (!you || id === _id) { ctx.throw(422, '参数不合法') }
		/* 
			判断是否已经关注过
			需要将 following 字段中存的 id 先转换为字符串, 因为
			存进去的是 mongoose 自定义的 ObjectId 类型, 遍历调用 toString() 处理即可
			或者 me.following.map(id => mongoose.Types.ObjectId(id)) 
		*/
		if (me.following.map(id => id.toString()).includes(id)) { 
			return ctx.body = res(1, '已经关注过该用户') 
		}
		// 往 following 字段添加被关注者的ID
		me.following.push(id)
		await me.save()

		ctx.body = res(0, '关注成功')
	},

	// 取消关注某人
	async unfollowUser(ctx, next) {
		// 被取消关注者ID
		const { id } = ctx.request.params
		// 取消关注者ID
		const { _id } = ctx.state.user
		// 查找取消关注者的信息
		const me = await UserModel.findById(_id).select('+following')
		// 查找被取消关注的人索引
		const index = me.following.map(id => id.toString()).indexOf(id)
		// 并没有关注这个人
		if (index < 0) { return ctx.body = res(1, '参数不合法') }
		// 删除被取消关注者的 ID
		me.following.splice(index, 1)
		await me.save()

		ctx.body = res(0, '取消关注成功')		
	}
	
}