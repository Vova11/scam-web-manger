const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Website = require('./website')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'Please provide name'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true,'Please provide email'],
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true,'Please provide password'],
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password can not contain "password" ');
      }
    },
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
},{
  timestamps: true
});

userSchema.virtual('websites', {
  ref: 'Website',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
  const user = this 
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token 
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('Unable to login!')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Unable to login!')
  }
  return user
}

// Hash password before saving
userSchema.pre('save', async function(next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.pre('remove', async function(next) {
  const user = this
  await Website.deleteMany({ owner: user._id })
  next()
})


const User = mongoose.model('User', userSchema)

module.exports = User;
