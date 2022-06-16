const express = require('express')
const userRouter = require('./routers/user')
const websiteRouter = require('./routers/website')
const customerRouter = require('./routers/customer')


const app = express()

app.use(express.json())
app.use(userRouter)
app.use(websiteRouter)
app.use(customerRouter)

module.exports = app
