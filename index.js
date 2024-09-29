const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Users = {};

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('A user connected!');

  socket.on('set_username', username => {
    Users[socket.id] = username;
    console.log(`${Users[socket.id]} joined the chat!`);
    console.log(`${Object.keys(Users).length}`);
  })

  socket.on('message', (message) => {
    const username = Users[socket.id] || "Anonymous";
    socket.broadcast.emit('message', message);
    console.log(`${username}: ${message}`);
  })

  socket.on('disconnect', () => {
    const username = Users[socket.id] || "Anonymous";
    console.log(`${username} disconnected!`);
  })
})

const PORT = 3500;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
