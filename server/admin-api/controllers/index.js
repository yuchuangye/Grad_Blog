const user = require('./user.js')
const article = require('./article.js')
const upload = require('../../middlewares/upload.js')

// 整合多个模块的处理函数并导出
module.exports =  {
  ...user,
  ...article,
  upload
}