/*
 *
 *  修改资料
 *  mrlong  2014-5-27
 *
 *
 */



var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('profile/index',{});
});


module.exports = router;
