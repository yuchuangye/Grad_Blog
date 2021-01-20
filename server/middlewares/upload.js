/**
 * 文件上传处理中间件函数
*/
const res = require('../utils/response.js')
const random = require('../utils/random.js')
const fs = require('fs')
const path = require('path')

const upload = (ctx, next) => {

	// 获取请求的路由参数
	const { mime, type } = ctx.request.params
	// 获取上传的文件对象
	const file = ctx.request.files.file

	// 没有file属性 或 空文件
	if (!file || (!file.size && !file.name)) { ctx.throw(422, '上传失败!不合法的文件类型') }

	// 支持上传的文件类型
	const fileType = ['images', 'videos']
	if (
		!fileType.includes(mime) ||
		!/^(image|video)\/[A-z0-9.]{1,}$/.test(file.type)
	) { ctx.throw(422, '上传失败!不合法的文件类型') }

	// 读取 koa-body 临时保存的文件, 创建可读流
	const reader = fs.createReadStream(file.path)

	// 自定义文件名
	const time = +new Date()
	const newFilename = time + '_' + random(100, 99999) + '.' +  file.name.split('.')[1]

	// 文件保存的文件夹路径,拼接文件地址
	let savePath, url
	if (!type) {
		savePath = path.join(__dirname, `../upload/${mime}`)
		url = `${ctx.request.origin}/${mime}/${newFilename}`
	} else {
		savePath = path.join(__dirname, `../upload/${mime}/${type}`)
		url = `${ctx.request.origin}/${mime}/${type}/${newFilename}`
	}
	
	// 判断要保存到的文件夹是否已存在，不存在就新建
	if (!fs.existsSync(savePath)) { fs.mkdirSync(savePath) }

	// 创建可写流, 传入上传文件的完整绝对路径
	const write = fs.createWriteStream(savePath + `/${newFilename}`)
	// 写入文件
	reader.pipe(write)

	ctx.body = res(0, '文件上传成功', { file, url })
}

module.exports = upload