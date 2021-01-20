const res = require('../../utils/response.js')
const UserSchema = require('../../models/user.js')

// 路由处理函数
module.exports = {

	test(ctx, next) {
		let data = {
			token: 'admin hahahahaha',
			data: [],
			pre_page: 10,
			next_page: 12
		}
		ctx.body = res(0, 'success', data)
	},

	testAdd(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', require: true },
			age: { type: 'number', require: false }
		})
		ctx.body = res(0, 'success', ctx.request.body)
	}
	
}