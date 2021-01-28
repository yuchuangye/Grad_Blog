const mongoose = require('./db.js')
const { d_avatar } = require('../config.js')

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
  security: { type: String, select: false },
  // 头像
  avatar: { type: String, default: d_avatar },
  // 注册时间
  createTime: { type: Date, default: Date.now },
  // 职位
  job: { type: String, default: '暂无~' },
  // 公司
  company: { type: String, default: '暂无~' },
  // 个人介绍
  introduce: { type: String, default: '暂无~' },
  // 关注的人
  following: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    select: false
  }

})


module.exports = mongoose.model('User', UserSchema)
