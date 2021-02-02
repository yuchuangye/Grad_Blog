const mongoose = require('./db.js')

// 后台管理系统 用户模型
const AdminSchema = mongoose.Schema({
  username: { type: String, trim: true },
  password: { 
    type: String,
    // 查询数据时默认不把password字段带出来
    select: false,
    // 密码加密
    set (val) { return require('bcryptjs').hashSync(val, 10) }
  },
  // 角色，有 管理员和访客两种
  role: { type: String, enum: ['admin', 'visitor'], default: 'visitor' }
})


module.exports = mongoose.model('Admin', AdminSchema)
