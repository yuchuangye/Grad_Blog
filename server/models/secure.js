const mongoose = require('./db')

// 密保问题Schema模型定义
const SecureSchema = mongoose.Schema({
  name: { 
    type: String, 
    trim: true, 
    require: true 
  }
})

module.exports = mongoose.model('Secure', SecureSchema)