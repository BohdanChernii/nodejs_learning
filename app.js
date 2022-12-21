const express = require("express")
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express')
const config = require('./config')
const mongoose = require("mongoose");
require('dotenv').config()

const swagger = require('./swagger.json')
const cron = require('./cron')
const userRouter = require('./router/user.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))

mongoose.set('strictQuery', true)

app.use(fileUpload)


app.use('/users', userRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger))

app.get('/', (req, res) => {
  res.json('WELOCME')
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  })
})

app.listen(config.PORT, async () => {
  await mongoose.connect('mongodb://localhost:27017/test-project')
  // cron.cronRunner()
  console.log(`${config.PORT} listen`)
})