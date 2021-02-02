const res = require('../../utils/response.js')
const ArticleModel = require('../../models/article.js')

// 路由处理中间件
module.exports = {

	delArticle(ctx, next) {
		ctx.body = res(0, '删除文章成功')
	},

	updateArticle(ctx, next) {
		ctx.body = res(0, '修改文章成功')
	}

}