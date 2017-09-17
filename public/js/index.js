const socket = io();

//event name is connect.
socket.on('connect', function (user){
  console.log('Connected to server.');

});

//event name is disconnect
socket.on('disconnect', function (){
  console.log('Disconnected from server.');
})

socket.on('newMessage', function(message){
  console.log(`Message from ${message.from}`, message.text);
})

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'

  // a second argument is a callback function, which will work as the acknowledgement
}, function(){

})
