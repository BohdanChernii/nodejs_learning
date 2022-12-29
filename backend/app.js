const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
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

  while (!dbCon) {
    try {
      console.log('Connecting to database...')
      await mongoose.connect(process.env.MONGO_URI)
      dbCon = true
      console.log('Database available!!!')
    } catch (e) {
      console.log('Database unavailable, wait 3 seconds')
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

}
const start = async () => {
  try {

    await app.listen(+process.env.PORT, process.env.HOST,1, async()=>{
      await connection()
    })
    console.log(`Server listening on ${process.env.PORT} port`)
  } catch (e) {
    console.log(e);

  }
}

start()