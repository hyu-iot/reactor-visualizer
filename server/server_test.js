const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const server = require('http').createServer(app)
const io = require('socket.io')(server);


const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//app.use(indexRouter);
//app.use("/api", apiRouter);


const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`listening on port ${port}`));


var dots = [];

app.post("/api/add", function(req, res, next) {
    dots.push(req.body);
    console.log(req.body);
    res.json(dots);
    io.emit("dots", req.body);

});
