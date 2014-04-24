
var express = require('express');
var router = express.Router();


function render(res,html,obj){
  var vp = __dirname+'/views/';
  res.render(vp+html, obj);
};

router.use(express.static(__dirname + '/public'));

router.use('/', function(req, res, next){
  render(res,'login',{});
});



module.exports = router;