const express = require('express')
const config = require('./config')
const mongoose = require('mongoose')

const userRouter = require('./router/user.router')
const app = express()
const cron = require('./cron')

const swaggerUi = require('swagger-ui-express')
const swaggerJs = require('./swagger.json')
app.use(express.json())

app.use(express.urlencoded({extended: true}))
mongoose.set('strictQuery', true)

app.use('/users', userRouter)
app.use('/docs',swaggerUi.serve, swaggerUi.setup( swaggerJs ))


app.use((err,req,res,next)=>{
  console.log(err);
  res.status(err.status || 500).json({
    message:err.message || 'Unknown error',
    status:err.status || 500
  })
})

app.listen(config.PORT, async () => {
  await mongoose.connect(config.MONGO_URL)

  // cron.cronRunner()
    console.log(`${config.PORT} listen`)
})