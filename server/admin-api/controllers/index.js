const admin = require('./admin')
const tag = require('./tag')
const ad = require('./ad')
const user = require('./user')
const upload = require('../../middlewares/upload')

// 整合多个模块的控制器并导出
module.exports = {
  ...admin,
  ...tag,
  ...ad,
  ...user,
  upload
}