const Koa = require('koa')
const app = new Koa()
const path = require('path')
// 中间件
const error = require('koa-json-error')
const bodyParser = require('koa-bodyparser')
const parameter = require('koa-parameter')
const cors = require('@koa/cors')
const koaStatic = require('koa-static')
// 路由和工具函数
const webRouter = require('./web-api/routes.js')
const adminRouter = require('./admin-api/routes.js')
const formatError = require('./utils/formatError.js')


// 错误处理中间件
app.use(error(formatError))
// 处理 post请求的请求体参数
app.use(bodyParser())
// 参数校验中间件
app.use(parameter(app))
// 跨域
app.use(cors())
// 静态资源托管
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, 'upload')))

//注册路由
app.use(webRouter.routes())
app.use(adminRouter.routes())
// 405 请求方式错误
app.use(webRouter.allowedMethods())
app.use(adminRouter.allowedMethods())

const PORT = 3009
app.listen(PORT, () => { console.log(`Run In: http://localhost:${PORT}`) })