const res = require('../../utils/response.js')
const TagModel = require('../../models/tag.js')

// 路由处理函数
module.exports = {

	// 获取一级标签列表
	async tagOneList(ctx, next) {
		// 分页处理
		let { page = 1, pageSize = 5 } = ctx.request.query
		page = Number(page)
		pageSize = Number(pageSize)
		const skip = (page - 1) * pageSize

    // 一级标签总数
		const total = await TagModel.find({ parent: { $exists: 0 } }).countDocuments()
		// 查询不存在 parent 字段的数据, 即是一级标签数据
		const tagList = await TagModel.find({ parent: { $exists: 0 } }).skip(skip).limit(pageSize)

		ctx.body = res(0, '获取一级标签成功', { total, tagList })
 	},

	// 获取二级标签列表
	async tagTwoList(ctx, next) {
		// 分页处理
		let { page = 1, pageSize = 5 } = ctx.request.query
		page = Number(page)
		pageSize = Number(pageSize)
		const skip = (page - 1) * pageSize		

		// 一级标签 ID
		const { id } = ctx.request.params

		// 当前二级标签总数
		const total = await TagModel.find({ parent: { $exists: 1 }, parent: id }).countDocuments()
		/* 
			查询存在 parent 字段并且其值等于 id 的数据, 即是对应二级标签数据 
			注意：因为 parent 字段是 ObjectId类型, 如果你传过来的 id 不符合
					 ObejctId 的规范, 操作数据库的时候 mongoose会抛出一个500错误, 如何符合则会自动将其
					 转换为 ObjectId类型

			可以不用判断 一级标签是否存在，不存在查询出来 tagList = []
		*/
		const tagList = await TagModel.find({ parent: { $exists: 1 }, parent: id }).skip(skip).limit(pageSize)

		ctx.body = res(0, '获取二级标签成功', { total, tagList })
	},

	// 获取某个标签
	async itemTag(ctx, next) {
		const { id } = ctx.request.params
		const tag = await TagModel.findById(id)
		if (!tag) { return ctx.body = res(1, '该标签不存在') }

		ctx.body = res(0, '获取标签成功', { tag })
	},

	// 添加标签
	async addTag(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			// 无论是 true 还是 false, 都不能为 '', 否则校验失败
			name: { type: 'string', required: true },
			icon: { type: 'string', required: false },
			// 为 false时可以不传，如果传了就不能为 '' 值
			parent: { type: 'string', required: false }
		})
		
		let { name, parent } = ctx.request.body

		// 校验名字是否合法
		name = name.trim()
		if (!name) { ctx.throw(422, '参数不合法') }

		// isHave 用于标记标签是否已存在, tag是添加后返回的标签信息
		let isHave, tag
		// 根据 parent的值判断添加的是一级标签还是二级标签
		if (!parent) {

			// 一级标签不能同名, 一级和二级可以同名
			isHave = await TagModel.findOne({ parent: { $exists: 0 }, name })
			if (isHave) { return ctx.body = res(1, '该一级标签已存在') }

		  tag = await TagModel.create(ctx.request.body)

			ctx.body = res(0, '新增一级标签成功', { tag })

		} else {

		  // 判断一级标签是否存在, 还要注意不能把二级添加到二级下
			const tagOne = await TagModel.findOne({ parent: { $exists: 0 }, _id: parent })
			if (!tagOne) {　return ctx.body = res(1, '该一级标签不存在')　}

			// 不同一级下的二级可以同名
			isHave = await TagModel.findOne({ name, parent })
			if (isHave) { return ctx.body = res(1, '该标签下的二级标签已存在') }

			tag = await TagModel.create(ctx.request.body)

			ctx.body = res(0, '新增二级标签成功', { tag })

		}
	},

	// 更新标签
	async updateTag(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			// 为 false时可以不传，如果传了就不能为 '' 值, 否则校验失败
			name: { type: 'string', required: false },
			icon: { type: 'string', required: false },
			parent: { type: 'string', required: false }
		})		
		
		const { name, icon, parent } = ctx.request.body
		const { id } = ctx.request.params

		// 三个参数都没传
		if (!name && !icon && !parent) { return ctx.throw(422, '参数不合法') }
		
		const hasTag = await TagModel.findById(id)
		if (!hasTag) { return ctx.body = res(1, '该标签不存在') }

		// 根据 parent 字段判断更新的是一级标签还是二级标签
		let tag
		if (!parent) {

			// 一级标签不能同名, 一级和二级可以同名
			isHave = await TagModel.findOne({ parent: { $exists: 0 }, name })
			if (isHave) { return ctx.body = res(1, '该一级标签已存在') }
			
			await TagModel.findByIdAndUpdate(id, ctx.request.body)
			tag = await TagModel.findById(id)

		} else {

			// 判断一级标签是否存在, 还要注意不能把二级添加到二级下
			const tagOne = await TagModel.findOne({ parent: { $exists: 0 }, _id: parent })
			if (!tagOne) {　return ctx.body = res(1, '该一级标签不存在')　}
			// 不同一级下的二级可以同名
			isHave = await TagModel.findOne({ name, parent })
			if (isHave) { return ctx.body = res(1, '该标签下的二级标签已存在') }

			await TagModel.findByIdAndUpdate(id, ctx.request.body)
			tag = await TagModel.findById(id)
		}

		ctx.body = res(0, '更新标签成功', { tag })
	},

	// 删除标签
	async delTag(ctx, next) {
		const { id } = ctx.request.params
		// 查询要删除的标签
		let tag = await TagModel.findById(id)
		if (!tag) { return ctx.body = res(1, '该标签不存在') }

		// 判断要删除的是一级还是二级标签
		if (!tag.parent) {
			// 删除的是一级, 需要把其下的所有二级标签也删除
			await TagModel.deleteMany({
				$or: [{ _id: id }, { parent: id }]
			})
		} else {
			// 删除的二级标签, 直接删除即可
			tag = await TagModel.findByIdAndDelete(id)
		}
		ctx.body = res(0, '删除标签成功', { tag })
	}
	
}