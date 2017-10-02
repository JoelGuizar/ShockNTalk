const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
console.log(__dirname + '/../public');



const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')

//server.io needs the Vanilla Node method.
const server = http.createServer(app)

//then, you call socketIO on the http server created to get back the websocket server
const io = socketIO(server);
const googleMapURI = 'https://www.google.com/maps?q='

//static middleware for your public files
app.use(express.static(publicPath))

//this is an io event emitter that is listening for an event
io.on('connection', (socket) => {
  console.log('New user connected.');

  //since it's not a listener, no callback
  //the second argument is the data you want to send across

  //emit must match the client side event.
  //does not take a callback, but an object to emit to the listener
  socket.emit('newMessage', generateMessage('Admin', 'Welcome'))

  //broadcast emits its object to everyone - but - the one who sent it
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'))

  //acknowledgement is like a sucess handler
  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))

    //this will launch the Event acknowledgement
    callback();

  })

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  //the socket always refers to this particular socket, not all the sockets.
  //disconnect is an event.
  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

//need to make socket.io work with the create HTTP module express is using behind the scenes
server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}.`);
})
