const mongoose = require('./db')

const AdSchema = mongoose.Schema({
  name: { type: String, trim: true },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', AdSchema)