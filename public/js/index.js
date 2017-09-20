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
  var li = $('<li> </li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
})

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'

  // a second argument is a callback function, which will work as the acknowledgement
}, function(data){
  console.log('Got it!');
  console.log(data);
})

$('#message-form').on('submit', function(e){
  e.preventDefault(); //prevents default behavior aka page refresh

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val() //selects any name = message
  }, function (){ //acknowledgement

  })
})

var locationButton = $('#send-location');

locationButton.on('click', function(){
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', function(){
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('unable to fetch location') //if no permission/unsuccess case
  })
})
