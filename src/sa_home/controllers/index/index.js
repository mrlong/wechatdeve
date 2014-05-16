/*
 *
 *  用户中心首页
 *  mrlong  2014-4-27
 *
 *
 */



var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	console.log('home index');
	var app = req.app;
    console.log(app.get('views'));

	res.render('index/index',{});
});


module.exports = router;



