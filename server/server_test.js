const app = require('express')();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods:["GET", "POST"]
    }
});
const bodyParser = require("body-parser");
const cors = require('cors');

const port = process.env.PORT || 8080;

const apiRouter = require('./routes/api');

var dots = {};
var count = 0;



io.on('connection', (socket) => {

    const request = socket.request;

    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    console.log('New client connected! ', ip, socket.id);

    socket.emit('currentCount', count);


    socket.on('test', (msg) => {
        console.log(`Message from client: ${msg}`);
    });

    socket.on('clearAll', () => {
        for (const key in dots){
            delete obj[key];
        }
        count = 0;
    });

    socket.on('requestDot', (count) => {
        socket.emit("sendDot", dots[count]);
    })

});



app.use(bodyParser.json());
app.use(cors());

app.use("/api", apiRouter);


app.post("/api/add", (req, res, next) => {
    //dots.push(req.body);
    //console.log(req.body);
    
    count = count + 1;
    dots[count] = {
        "logicalTime": req.body.logicalTime,
        "dot": req.body.dot
    };
    
    res.json(dots);
    
    console.log(dots);
    console.log(Object.keys(dots).length);

    io.emit("newDotUpdated", count);

});




server.listen(8080, () => {
    console.log(`listening on port ${port}`);
});

