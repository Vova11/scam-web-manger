const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  }) 
}

module.exports = connectDB;
