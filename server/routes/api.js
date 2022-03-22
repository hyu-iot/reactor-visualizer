const express = require("express");
const router = express.Router();

var dots = [];

router.get("/", function(req, res, next) {
    if(dots.length > 0){
        res.json(dots[dots.length-1]);
    }
    else{
        res.json({});
    }
});

router.get("/get/all", function(req, res, next) {
    res.json(dots);
})

router.get("/get/:idx", function(req, res, next){
    if(dots.length == 0) {
        res.json({});
    }
    else {
        if (req.params.idx < dots.length) {
            res.json(dots[req.params.idx]);
        }
        else {
            res.json(dots[dots.length-1]);
        }
    }

});

router.get("/clear", function(req, res, next){
    dots = [];
    console.log("dots cleared!");
    res.json({});
})

router.get("/test", function(req, res, next){
    res.json({1: "test"});
})

router.post("/add", function(req, res, next) {
    dots.push(req.body);
    console.log(req.body);
    res.json(dots);
});

module.exports = router;