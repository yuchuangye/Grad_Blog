const mongoose = require('./db.js')
const { d_tag } = require('../config.js')

// 标签Schema模型定义
const TagSchema = mongoose.Schema({
  // 标签名字
  name: { type: String, trim: true },
  // 默认图标
  icon: { type: String, default: d_tag },
  // 一级标签
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }
})


module.exports = mongoose.model('Tag', TagSchema)
