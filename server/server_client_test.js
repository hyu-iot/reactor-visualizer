const io = require('socket.io-client').io;


const socket = io.connect('http://localhost:8080');

socket.on('dots', ({dots}) => {
    console.log(dots);
});

