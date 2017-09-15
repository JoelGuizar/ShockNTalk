const socket = io();

//event name is connect.
socket.on('connect', function (){
  console.log('Connected to server.');

  socket.emit('createEmail', {
    to: 'joeljoel@joel.com',
    text: 'Hey. This is Andrew'
  })

  socket.emit('createMessage', {
    to: 'mary',
    text: 'hey hey hey'
  })
});

//event name is disconnect
socket.on('disconnect', function (){
  console.log('Disconnected from server.');
})

//emit is creating an event instead of listening for an event

//custom event
socket.on('newEmail', function (email){
  console.log('New Email', email);
})

socket.on('newMessage', function(message){
  console.log(`Message from ${email.from}`, message);
})
