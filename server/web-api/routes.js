const Router = require('@koa/router')
const handle = require('./handle.js')

// 实例化路由对象，并设置路由前缀
const router = new Router({ prefix: '/web' })

router.get('/test', handle.test)
router.post('/test/add', handle.testAdd)

module.exports = router