
const mongoose = require('mongoose')

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  fullTitle: {
    type: String,
    trim: true,
    lowercase: true,
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

websiteSchema.methods.toJSON = function() {
  const website = this 
  const websiteObject = website.toObject()
  delete websiteObject.id
  delete websiteObject.active
  delete websiteObject.owner
  delete websiteObject.createdAt
  delete websiteObject.updatedAt
  delete websiteObject.__v
  return websiteObject
}

const Website = mongoose.model('Website', websiteSchema)

module.exports = Website