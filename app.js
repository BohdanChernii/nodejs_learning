const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const {userRouter} = require('./routers')
const config = require('./config/user.config')

const app = express()


app.use('/users', userRouter)
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
  res.json('Welcome')
})

app.use((err,req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  })
})


app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGO_URL)
  console.log(`Server listen ${config.PORT}`)
})

app.listen()