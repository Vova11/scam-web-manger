const app = require('./app')
const connectDB = require('./db/mongoose')
const {connectRedis} = require('../utils/redis')
const PORT = process.env.PORT || 3000


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log(`Connecting to DB ...`);
    await connectRedis()
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}...`);
    })    
  } catch (error) {
    console.log(error);    
  }
}
start()    