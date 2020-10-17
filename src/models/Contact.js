const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
})

module.exports = model('Contact', contactSchema)