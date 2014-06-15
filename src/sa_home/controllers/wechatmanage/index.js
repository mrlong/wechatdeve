/*
 *
 *  公众账号管理，用于生成多个公众账号功能
 *  mrlong  2014-6-15
 *
 *
 */



var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
	res.render('wechatmanage/index',{});
});


//增加
router.use(require('./add.js'));

module.exports = router;
