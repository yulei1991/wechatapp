var express = require('express');
var router = express.Router();

router.post('/logout', function(req, res, next) {
  res.send('logout success');
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;
