const socket = io();

//event name is connect.
socket.on('connect', function (user){
  console.log('Connected to server.');

});

//event name is disconnect
socket.on('disconnect', function (){
  console.log('Disconnected from server.');
})

//event listener on client side
socket.on('newMessage', function(message){
  var li = $('<li> </li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
})

//example emitter
// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
//
//   // a second argument is a callback function, which will work as the acknowledgement
// }, function(data){
//   console.log('Got it!');
//   console.log(data);
// })

//event listener for Admin Location message
socket.on('newLocationMessage', function(message){
  var li = $('<li></li>');
  //with target set to blank, it'll open in a new window
  var a = $('<a target="_blank">My current location</a>')

  //instead of writing this all in template strings, we use the attribute methods
  //this prevents malicious people from injecting code straight in. So, we do it
  //separately like below
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages').append(li);

})

//simple form for chat message
$('#message-form').on('submit', function(e){
  e.preventDefault(); //prevents default behavior aka page refresh

  let messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val() //selects any name = message
  }, function (){ //acknowledgement
    messageTextbox.val('')
  })
})

var locationButton = $('#send-location');


//navigator geolocation is a browser method, responds in coordinates.
locationButton.on('click', function(){
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled')
    alert('unable to fetch location') //if no permission/unsuccess case
  })
})
