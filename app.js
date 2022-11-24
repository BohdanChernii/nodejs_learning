const express = require('express')
require('dotenv').config()
const configs = require('./config/config')
const userRouter = require('./router/user.router')
const apartmentRouter = require('./router/apartments.router')
const mongoose = require("mongoose");


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.json('WELOCME')
})

app.use('/users', userRouter)
app.use('/apartments', apartmentRouter)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  })
})

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL)
  console.log(`${configs.PORT} works`);
})






