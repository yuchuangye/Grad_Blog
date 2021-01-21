const mongoose = require('./db.js')

// 用户Schema模型定义
const UserSchema = mongoose.Schema({
  username: { type: String, trim: true },
  password: { 
    type: String,
    // 查询数据时默认不把password字段带出来
    select: false,
    // 密码加密
    set (val) { return require('bcryptjs').hashSync(val, 10) }
  },
  // 密保
  security: { type: String, trim: true, select: false }
})


module.exports = mongoose.model('User', UserSchema)
