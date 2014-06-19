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
var Obj = require('../lib/obj');
var Db = require('../lib/db');


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

//
//目的是为了取出当前的公众账号内容 
//可以采用 currwechat获取当前的值。
//
var getcurrwechat = function(req,res,next){
  var data = new Obj({
    wech_guid : req.params.guid
  });
  
  data.xss().trim();
  
  Db.query('SELECT * FROM ims_wechats where wech_guid=?',[data.wech_guid],function(err,results){
    if(!err && results.length>0){
      res.locals.currwechat = results[0];
     
    };
    next();        
  });   
};

router.get('/:controllers/:guid',getcurrwechat);
router.get('/:controllers/:guid/*',getcurrwechat);
router.get('/:controllers/:guid/*/*',getcurrwechat);
router.get('/:controllers/:guid/*/*/*',getcurrwechat);
router.get('/:controllers/:guid/*/*/*/*',getcurrwechat);

router.use(function(req,res,next){
  if(!res.locals.currwechat){
    res.render('ontfoundwechat',{}); 
  }
  else{
    next();
  }
});

//控制器列表。
[
	{url:'/index',name:'index'},
    {url:'/profile',name:'profile'},
    {url:'/users',name:'users'}         //用户管理

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;