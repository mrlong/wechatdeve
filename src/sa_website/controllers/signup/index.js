/*
 *
 * 注册用户
 *
 *
 */

var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('signup/index.html');
});

module.exports = router;