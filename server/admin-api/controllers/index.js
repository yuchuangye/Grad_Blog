const admin = require('./admin.js')
const article = require('./article.js')
const upload = require('../../middlewares/upload.js')

// 整合多个模块的控制器并导出
module.exports =  {
  ...admin,
  ...article,
  upload
}