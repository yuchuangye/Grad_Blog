const Koa = require('koa')
const app = new Koa()
const path = require('path')
// 中间件
const error = require('koa-json-error')
const koaBody = require('koa-body')
const parameter = require('koa-parameter')
const cors = require('@koa/cors')
const koaStatic = require('koa-static')
// 路由和工具函数
const webRouter = require('./web-api/routes.js')
const adminRouter = require('./admin-api/routes.js')
const formatError = require('./utils/formatError.js')

// koa-body 配置对象
const uploadConfig = {
  // 支持文件上传
  multipart: true,
  // 文件上传相关配置
  formidable: {
    // 保留文件后缀
    keepExtensions: true,
    // 限制文件上传大小为 100M
    maxFieldsSize: 100 * 1024 * 1024
  }
}

// 错误处理中间件
app.use(error(formatError))
// 参数校验中间件
app.use(parameter(app))
// 跨域
app.use(cors())
// 处理 post请求的请求体参数以及文件上传
app.use(koaBody(uploadConfig))
// 静态资源托管
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, 'upload')))

//注册路由
app.use(webRouter.routes())
app.use(adminRouter.routes())
// 405 请求方式错误
app.use(webRouter.allowedMethods())
app.use(adminRouter.allowedMethods())

const { port, domain } = require('./config.js')
app.listen(port, () => { console.log(`Run In: ${domain}`) })
