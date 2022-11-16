const express = require('express')

const dataBase = require('./dataBase/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(5000, () => {
  console.log('5000 works');
})

app.get('/', (req, res) => {
  console.log('main endpoint');
})


app.get('/users', (req, res) => {
  console.log('It is users');
  // res.json({name: 'Bohdan'})
  // res.end('only string')
  // res.sendFile('./')
  // res.status(402).json('Ok')
  res.json(dataBase)
})

// app.get('/users/1',(req,res)=>{
//   res.json(dataBase[1])
// })

app.get('/users/:userId', (req, res) => {
  console.log(req.params.userId);
  const {userId} = req.params
  if (userId && typeof (+userId) === 'number') {
    res.json(dataBase[userId])
  }

})

app.delete('/users/:userId', (req, res) => {
  const {userId} = req.params
  if (userId && typeof (+userId) === "number") {
    res.json(dataBase.splice(+userId, 1))
  }
})

app.post('/users', (req, res) => {
  const userInfo = req.body
  const {age, name} = userInfo
  if (age && name) {
    dataBase.push(userInfo)
    res.status(200).json('created')
  }
  res.end('Error with creating user')
})

app.put('/users/:userId', (req, res) => {
  const userInfo = req.body
  const {userId} = req.params
  const {age, name} = userInfo

  if (age && name) {
    if (typeof (+userId) === 'number')
      dataBase[userId] = userInfo
    res.status(200).json('Updated')
  }


})

app.patch('/users/:userId', (req, res) => {
  const {userId} = req.params
  const userInfo = req.body
  const {age, name} = userInfo
  if (age || name) {
    if(typeof (+userId) === 'number'){
      dataBase[userId] = {...dataBase[userId], ...userInfo}
      res.status(200).json('updated user field')
    }
  }
  res.end('Error with updating user field')
})


