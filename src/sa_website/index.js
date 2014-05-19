var express = require('express');
var router = express.Router();
var config = require('../config');
var db = require('../lib/db');
var util = require('../lib/util');

router.use(function(req,res,next){
	var app = req.app;
    app.set('views',  __dirname +  '/views');
    console.log('website');
    console.log(app.get('views'));

    if(req.session.curruser){
    	console.log(req.session.curruser);
    	res.locals.curruser = {
            memb_guid:req.session.curruser.memb_guid,
    		memb_name:req.session.curruser.memb_name,
    		megr_guid:req.session.curruser.megr_guid,
    		megr_name:req.session.curruser.megr_name
    	};
      next();
    }
    else{
      //cookie 内取出来
      var cookie = req.cookies[config.cookieSecret];
      if (!cookie) {
        return next();
      };
      
      var auth_token = util.decrypt(cookie, config.sessionSecret);
      var auth = auth_token.split('\t');
      
      db.query('select * from ims_members where memb_guid=? and memb_status=0',[auth[0]],function(err,results){
        if(!err){
          req.session.curruser = {
            memb_guid:auth[0],
            memb_name:auth[1],
            megr_guid:auth[2],
            megr_name:auth[3]};
          db.query('update ims_members set memb_lastdate=now() where memb_guid=?',[auth[0]]); //更新登录时间
        };
        
        return next();
      });
      
      
      
      
      
//      user.getUserById(user_id,function(err,user){
//        if(!err && user){
//          user.logincount++;
//          user.lastlogin = Date.now();
//          user.save();
//          req.session.user = user;
//          //req.session.user.name = 'mrlong'
//          res.locals.user = user;
//
//          return next();
//        }
//        else{
//          return next(err);
//        }
//      });
//      
    };
});

//控制器列表。
[
	{url:'/',name:'index'},
	{url:'/login',name:'login'},   //登录
	{url:'/logout',name:'logout'},  //退出
	{url:'/signup',name:'signup'}  //用户注册

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;
