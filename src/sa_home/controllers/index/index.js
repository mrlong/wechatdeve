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
	res.render('index/index',{});
});


module.exports = router;



