const express = require('express')
const mongoose = require('mongoose')
const configs = require('./config/user.config')
require('dotenv').config()

const userRouter = require('./router/user.router')
const authRouter = require('./router/auth.router')
const carRouter = require('./router/car.router')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/car',carRouter)



app.get('/', (req, res) => {
  res.json('Welcome');
})

app.use((err, rea, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error',
    status: err.status || 500
  })
})

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.MONGO_URL)
  console.log(`listen ${configs.PORT}`)
})
