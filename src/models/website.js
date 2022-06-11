const mongoose = require('mongoose')

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true
  },
  link: {
    type: String,
    trim: true,
    lowercase: true
  },
  active: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {virtuals: true}
})

const Website = mongoose.model('Website', websiteSchema)

module.exports = Website