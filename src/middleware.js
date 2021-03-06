/*
 * 作者：龙仕云  2014-5-27
 * 处理权限
 * 处理公共变量到模板引擎之内
 *
 *
 */

var express = require('express');
var router = express.Router();
var config = require('./config');
var db = require('./lib/db');
var util = require('./lib/util');

//认证登录
router.use(function(req,res,next){
  
    if(req.session.curruser){
    	console.log(req.session.curruser);
    	res.locals.curruser = {
            memb_guid:req.session.curruser.memb_guid,
            memb_loginname:req.session.curruser.memb_loginname,
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
            memb_loginname:auth[1],
            memb_name:auth[2],
            megr_guid:auth[3],
            megr_name:auth[4]};
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


//页面模板变量
// req_path = req.path
router.use(function(req,res,next){
  res.locals.req_path = req.path;
  next();
});

module.exports = router;