/*
 *
 *  增加公众账号管理
 *  mrlong  2014-6-15
 *
 *
 */



var express = require('express');
var router = express.Router();


router.get('/add',function(req,res,next){
	res.render('wechatmanage/add',{req_path:'/home/wechatmanage/'});
});


module.exports = router;
