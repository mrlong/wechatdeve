
var express = require('express');
var router = express.Router();
var util = require('../lib/util');
var config = require('../config');

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
  console.log('home');
  var app = req.app;
  app.set('views',  __dirname +  '/views');
  
  console.log(app.get('views'));  
  next();	

});

//控制器列表。
[
	{url:'/index',name:'index'},
    {url:'/changepw',name:'changepw'},   //修改密码
    {url:'/profile',name:'profile'},      //修改资料
  
    //微信管理
    {url:'/wechatmanage',name:'wechatmanage'}   //公众号管理

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;
