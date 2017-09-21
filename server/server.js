const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
console.log(__dirname + '/../public');


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')
const server = http.createServer(app) //needs the og method
const io = socketIO(server); //calls it on the http server, we get back the websocket server
const googleMapURI = 'https://www.google.com/maps?q='

app.use(express.static(publicPath)) //static middleware for public folder

//this is an io event emitter that is listening for an event
io.on('connection', (socket) => {
  console.log('New user connected.');

  //emit/on must match the client side event, in this case NewEmail
  //since it's not a listener, no callback
  //the second argument is the data you want to send across

  socket.emit('newMessage', generateMessage('Admin', 'Welcome'))
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined!'))

  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server'); // will launch Event acknowledgement

  })

  socket.on('createLocationMessage', (coords) =>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })


  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
}); // the arg is the particular socket instead of all the users

//need to make socket.io work with the create HTTP module express is using behind the scenes
server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}.`);
})
