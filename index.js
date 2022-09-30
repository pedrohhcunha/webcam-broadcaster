// Server config
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/client', (req, res) => {
    res.sendFile(__dirname + '/client.html')
})
app.get('/streamer', (req, res) => {
    res.sendFile(__dirname + '/streamer.html')
})

io.on('connection', socket => {

    console.log("User connected")

    socket.on('streaming', data => {

        socket.broadcast.emit('streaming', data)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})