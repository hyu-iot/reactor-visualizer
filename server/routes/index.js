const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.end("index route /");
});

module.exports = router;