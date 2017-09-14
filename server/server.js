const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

console.log(__dirname + '/../public');
console.log();


const PORT = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public')
const server = http.createServer(app)


app.use(express.static(publicPath)) //static middleware for public folder

//need to make socket.io work with the create HTTP module express is using behind the scenes
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}.`);
})
