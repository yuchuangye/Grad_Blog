const mongoose = require('./db.js')

// 文章Schema模型定义
const ArticleSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String }
})


module.exports = mongoose.model('Article', ArticleSchema)
