const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('User has Connected' + socket.id);

  socket.on('disconnect', () => {
    console.log('User has Disconnected');
  });

  socket.on('message', (data) => {
    io.emit('message', data);
  });
});

http.listen(port, () => {
  console.log('Server is listening on', port);
});
