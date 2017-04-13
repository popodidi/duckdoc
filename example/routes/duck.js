var express = require('express');
var router = express.Router();

// GET /duck
router.get('/', function(req, res, next) {
  var resBody = {
    color: "white",
    sound: "quack",
    canFly: false,
    canSwim: true,
    foots: [
      "left", "right"
    ],
    eyeNumber: 2
  }

  res.status(200).json(resBody);
});

// POST /duck
router.post('/alwaysSuccessPost', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
