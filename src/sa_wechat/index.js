/*
 * 公众平台的内容管理
 * 作者：龙仕云 2014-6-17
 *
 *
 */

var express = require('express');
var router = express.Router();
var config = require('../config');
var util = require('../lib/util');


//认证
var auths = function(req,res,next) {
  //debuger;
  config.debug || console.log(req.session.curruser);
  if (req.session.curruser) {
  	return next();
  } 
  else {
  	return res.send(util.errBox("你没有登录，请登录！",'/login'));
   }
};

router.use(auths);

router.use(function(req,res,next){
  var app = req.app;
  app.set('views',  __dirname +  '/views');
  next();
});

//控制器列表。
[
	{url:'/',name:'index'},
    {url:'/profile',name:'profile'}

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;