const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  chrome_id: {
    type: Number,
  }, 
  
});



const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;
