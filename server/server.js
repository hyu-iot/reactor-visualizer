const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use(indexRouter);
app.use("/api", apiRouter);


const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`listening on port ${port}`));

