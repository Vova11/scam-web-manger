const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  customer_id: {
    type: Number,
  }, 
  
});



const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer;
