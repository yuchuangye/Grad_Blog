const Router = require('@koa/router')
const handle = require('./controllers/index.js')

// 实例化路由对象，并设置路由前缀
const router = new Router({ prefix: '/api/web' })

// 文件上传
router.post('/upload/:mime/:type?', handle.upload)

// 用户
router.post('/login', handle.login)
router.post('/register', handle.register)
// 文章
router.get('/test2', handle.test2)
router.post('/test/add2', handle.testAdd2)

module.exports = router