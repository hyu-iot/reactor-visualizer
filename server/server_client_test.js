const io = require('socket.io-client');


const socket = io.connect('http://localhost:8080');

console.log('check 1', socket.connected);


socket.on('dotInfoUpdate', (msg) => {

    var {logicalTime, newdot} = msg; 

    console.log(logicalTime);
    //console.log(newdot);
});

socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
});




setInterval(() => {
    socket.emit("test", "this is client. hi")
}, 1000);
