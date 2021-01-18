const res = require('../../utils/response.js')
const ArticleSchema = require('../../models/article.js')

// 路由处理中间件
module.exports = {
	test2(ctx, next) {
		let data = {
			token: 'article eeeeeeee',
			data: [],
			pre_page: 5,
			next_page: 7
		}
		ctx.body = res(0, 'success', data)
	},
	testAdd2(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			name: { type: 'string', require: true },
			age: { type: 'number', require: false }
		})
		ctx.body = res(0, 'success', ctx.request.body)
	}
}