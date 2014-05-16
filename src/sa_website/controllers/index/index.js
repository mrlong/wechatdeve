
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('index/index',{});
});


module.exports = router;


// exports.url = '';

// exports.before = function(req, res, next){
//   console.log('before3');
//   next();
// };


// exports.get = function(req, res, next){
//   //render(res,'./index', {});
//   res.render('main/index', {});
// };