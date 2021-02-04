const res = require('../../utils/response.js')
const TagModel = require('../../models/tag.js')

// 路由处理函数
module.exports = {

	// 获取一级标签列表
	async tagOneList(ctx, next) {
		// 先查出全部，再过滤出一级标签
		const tagAll = await TagModel.find()
		const tagOneList = tagAll.filter(item => !item.parent)
		ctx.body = res(0, '获取一级标签成功', { tagOneList })
 	},

	// 获取二级标签列表
	async tagTwoList(ctx, next) {
		// 一级标签 ID
		const { id } = ctx.request.params
		// 先查出全部，再过滤出二级标签
		const tagAll = await TagModel.find()
		const tagTwoList = tagAll.filter(item => item.parent && String(item.parent) === id)
		ctx.body = res(0, '获取二级标签成功', { tagTwoList })
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
			name: { type: 'string', required: true },
			icon: { type: 'string', required: false },
			parent: { type: 'string', required: false }
		})
		let { name, parent = '' } = ctx.request.body

		// 校验名字是否合法
		name = name.trim()
		if (!name) { ctx.throw(422, '参数不合法') }

		// 标签标签是否已存在
		let isHave = false
		// 根据 parent的值判断添加的是一级标签还是二级标签
		if (!parent) {

			// 添加一级
			const tagAll = await TagModel.find()
			// 一级标签不能同名, 一级和二级可以同名
			tagAll.forEach(item => {
				if (item.name === name && !item.parent) { isHave = true }
			})

			if (isHave) { return ctx.body = res(1, '该一级标签已存在') }
			const tagOne = await TagModel.create(ctx.request.body)
			ctx.body = res(0, '新增一级标签成功', { tagOne })

		} else {

			// 添加二级
			isHave = await TagModel.findOne({ name, parent })

			// 不同一级下的二级可以同名
			if (isHave) { return ctx.body = res(1, '该标签下的二级标签已存在') }

			// 判断一级标签是否存在, 还要注意不能把二级添加到二级下
			const tagOne = await TagModel.findById(parent)
			if (!tagOne || (tagOne && tagOne.parent )) {　return ctx.body = res(1, '该一级标签不存在')　}

			const tagTwo = await TagModel.create(ctx.request.body)
			ctx.body = res(0, '新增二级标签成功', { tagTwo })

		}
	},

	// 更新标签
	async updateTag(ctx, next) {
		// 参数校验
		ctx.verifyParams({
			icon: { type: 'string', required: false },
			parent: { type: 'string', required: false }
		})
		const { icon, parent = '' } = ctx.request.body
		const { id } = ctx.request.params
		
		const hasTag = await TagModel.findById(id)
		if (!hasTag) { return ctx.body = res(1, '该标签不存在') }

		// 两个参数都没传
		if (!icon && !parent) { return ctx.throw(422, '参数不合法') }

		// 如何传入了 parent, 要判断一级标签是否存在
		if (parent) {
			const tagOne = await TagModel.findById(parent)
			if (!tagOne || (tagOne && tagOne.parent )) {　return ctx.body = res(1, '该一级标签不存在')　}
		}
		await TagModel.findByIdAndUpdate(id, ctx.request.body)
		const tag = await TagModel.findById(id)

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
			tag = await TagModel.deleteMany({
				$or: [{ _id: id }, { parent: id }]
			})
		} else {
			// 删除的二级标签, 直接删除即可
			tag = await TagModel.findByIdAndDelete(id)
		}
		ctx.body = res(0, '删除标签成功', { tag })
	}
	
}