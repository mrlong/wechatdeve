
var express = require('express');
var router = express.Router();

router.use('/', function(req, res){
  res.send('Hello World-wechat');
});



module.exports = router;