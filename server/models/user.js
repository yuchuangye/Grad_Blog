const mongoose = require('./db')
const { d_avatar } = require('../config')

// 用户Schema模型定义
const UserSchema = mongoose.Schema({
  // 用户名
  username: { type: String, trim: true },
  // 密码
  password: { 
    type: String,
    // 查询数据时默认不把password字段带出来
    select: false,
    // 密码加密
    set (val) { return require('bcryptjs').hashSync(val, 10) }
  },
  // 密保
  security: { 
    type: { 
      question: { type: String }, // 问题Id, 这里没设置关联
      answer: { type: String } // 答案
    },
    select: false
  },
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
