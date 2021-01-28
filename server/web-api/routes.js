const Router = require('@koa/router')
const koaJwt = require('koa-jwt')
const { secret } = require('../config.js')
const handle = require('./controllers/index.js')
const judge = require('../middlewares/judge.js')

// 实例化路由对象，并设置路由前缀
const router = new Router({ prefix: '/api/web' })

// 使用koa-jwt 生成验证token 的中间件函数
const auth = koaJwt({ secret })

// 文件上传
router.post('/upload/:mime/:type?', auth, handle.upload)

// 用户
router.post('/login', handle.login)
router.post('/register', handle.register)

router.post('/user/auth', handle.authUser)
router.put('/user/password', handle.updateUserPassword)
router.put('/user/baseinfo', auth, handle.updateUserInfo)

router.get('/:id/user/following', handle.followingList)
router.get('/:id/user/followers', handle.followersList)
router.put('user/following/:id', auth, handle.followUser)
router.delete('user/following/:id', auth, handle.unfollowUser)

// 文章
router.put('/article/:id', auth, judge, handle.updateArticle)
router.delete('/article/:id', auth, handle.deleteArticle)

module.exports = router