const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on('sendMessage', ({ room, message, user }) => {
    io.to(room).emit('receiveMessage', { message, user, time: new Date().toLocaleTimeString() });
  });

  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

server.listen(5000, () => console.log('Server running on port 5000'));
