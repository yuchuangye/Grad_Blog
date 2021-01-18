// goods 集合(表) 定义文件
const mongoose = require('./db.js')

const ArticleSchema = mongoose.Schema({
  title: { type: String },
  content: { type: String }
})


module.exports = mongoose.model('Article', ArticleSchema)
