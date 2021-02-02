const Router = require('@koa/router')
const koaJwt = require('koa-jwt')
const handle = require('./controllers/index.js')
const { adminSecret } = require('../config.js')
const judge = require('../middlewares/judge.js')

// 实例化路由对象，并设置路由前缀
const router = new Router({ prefix: '/api/admin' })

// 使用koa-jwt 生成验证token 的中间件函数
const auth = koaJwt({ secret: adminSecret })

// 管理员
router.post('/login', handle.login)

router.get('/admin', handle.adminList)
router.get('/admin/:id', handle.itemAdmin)

router.put('/admin/:id', auth, judge, handle.updateAdmin)
router.delete('/admin/:id', auth, judge, handle.delAdmin)
router.post('/admin', auth, judge, handle.addAdmin)

// 文章
router.get('/test2', handle.test2)
router.post('/test/add2', handle.testAdd2)

module.exports = router