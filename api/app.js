const express = require('express')
const userRouter = require('./routers/user')
const websiteRouter = require('./routers/website')


const app = express()

app.use(express.json())
app.use(userRouter)
app.use(websiteRouter)

module.exports = app
