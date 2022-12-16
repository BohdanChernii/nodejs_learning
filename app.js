const express = require('express')
const mongoose = require('mongoose')
const configs = require('./config')

require('dotenv').config()

const userRouter = require('./router/user.router')
const carRouter = require('./router/car.router')
const authRouter = require('./router/auth.router')
const {cronRunner} = require("./cron");

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.set('strictQuery', true)

app.use('/users', userRouter)
app.use('/cars', carRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.json('You are welcome!!!')
})


app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  })
})

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL)
  console.log(`Listen port ${configs.PORT}`)
  cronRunner()
})