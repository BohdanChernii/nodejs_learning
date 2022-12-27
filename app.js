const http = require('http')
const socketIO = require('socket.io')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const userRouter = require('./router/user.router')
const authRouter = require('./router/auth.router')

const fileUpload = require('express-fileupload')


mongoose.set('strictQuery', true)

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(fileUpload())
const io = socketIO(server, {cors: 'http://localhost:80'})

io.on('connection', (socket) => {
  console.log(socket);
  console.log(socket.handshake.query.page);

  socket.on('message:send', (messageData) => {
    // console.log(messageData.text);
    // console.log(socket.handshake.auth);
    //SEND EVENT TO ALL EXCEPT EMITTER
    // socket.broadcast.emit('message:new', messageData.text)

    //SEND EVENT TO ALL CLIENTS
    io.emit('message:new', messageData.text)

    io.to(socket.id).emit('emit')
  })

  socket.on('room:join', (roomInfo) => {
    socket.join(roomInfo.roomId) // SOCKET JOIN ROOM
    // socket.leave(roomInfo.roomId) // SOCKET LEAVE ROOM

    // SEND TO ALL IN ROOM EXCEPT NEW MEMBER
    // socket.to(roomInfo.roomId).emit('user:room:join', socket.id)

    //SEND TO ALL IN ROOM MEMBER
    io.to(roomInfo.roomId).emit('user:room:join', socket.id)
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} was disconnected`)
  })

})

app.use('/auth', authRouter)
app.use('/users', userRouter)

app.get('/', (req, res, next) => {
  res.json('Welcome')
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Unknown error', status: err.status || 500
  })
})

server.listen(config.PORT, async () => {
  await mongoose.connect('mongodb://localhost:27017/june2022')
  console.log(`Port ${config.PORT} listen`)
})