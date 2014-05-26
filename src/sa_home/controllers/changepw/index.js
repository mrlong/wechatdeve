/*
 *
 *  修改密码
 *  mrlong  2014-5-23
 *
 *
 */



var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('changepw/index',{});
});


module.exports = router;
