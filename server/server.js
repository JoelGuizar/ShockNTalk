const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

console.log(__dirname + '/../public');
console.log();


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')
const server = http.createServer(app) //needs the og method
const io = socketIO(server); //calls it on the http server, we get back the websocket server


app.use(express.static(publicPath)) //static middleware for public folder

//this is an io event emitter that is listening for an event
io.on('connection', (socket) => {
  console.log('new user connected');
}) // the arg is the particular socket instead of all the users

//need to make socket.io work with the create HTTP module express is using behind the scenes
server.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}.`);
})
