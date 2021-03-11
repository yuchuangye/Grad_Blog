const mongoose = require('./db')

// 广告Schema模型定义
const AdSchema = mongoose.Schema({
  name: { type: String, trim: true },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', AdSchema)