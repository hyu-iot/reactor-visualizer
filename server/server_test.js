const app = require('express')();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;


io.on('connection', (socket) => {

    const request = socket.request;

    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log('New client connected! ', ip, socket.id);

    socket.on('test', (msg) => {
        console.log(`Message from client: ${msg}`);
    })

});

var dots = [];

app.use(bodyParser.json());


app.post("/api/add", (req, res, next) => {
    dots.push(req.body);
    console.log(req.body);
    res.json(dots);

    io.emit("dots", req.body);
});


server.listen(8080, () => {
    console.log(`listening on port ${port}`);
});

