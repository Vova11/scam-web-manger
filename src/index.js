const app = require('./app')
const connectDB = require('./db/mongoose')
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log(`Connecting to DB ...`);
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}...`);
    })    
  } catch (error) {
    console.log(error);    
  }
}
start()    