const mongoose = require('./db')

const SecureSchema = mongoose.Schema({
  name: { 
    type: String, 
    trim: true, 
    require: true 
  }
})

module.exports = mongoose.model('Secure', SecureSchema)