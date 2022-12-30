const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
// require('dotenv').config()
const User = require("./dataBase/User");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user)
})

const connection = async () => {
  let dbCon = false

  if (!dbCon) {
    try {
      console.log('Connecting to database...')
       await mongoose.connect('mongodb://user:user@db:27017/docker')
      dbCon = true
      console.log('Database available!!!')
    } catch (e) {
      console.log(e);
      console.log('Database unavailable, wait 3 seconds')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

}
const start = async () => {
  try {
    await connection()

    // await mongoose.connect('mongodb://user:user@db:27017/docker')
    await app.listen(5000, '0.0.0.0')

    console.log(`Server listening on ${5000} port`)
  } catch (e) {
    console.log(e);

  }
}

start()