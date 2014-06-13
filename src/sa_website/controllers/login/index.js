/*
 *
 *  登录后台
 *  mrlong  2014-4-27
 *
 *
 */
var express = require('express');
var router = express.Router();

var MySQL = require('../../../lib/mysql.js');
var Util  = require('../../../lib/util');
var db    = require('../../../lib/db');
var config = require('../../../config');
var async = require('async');



router.get('/',function(req,res,next){
  var again = req.query.again||false;
  if(req.session.curruser){
    res.render('login/loginsuccess',req.session.curruser);
  }
  else{
    res.render('login/login',{again:again});
  };
});

router.post('/',function(req,res,next){
  var loginname = req.body.loginname;
  var password = req.body.password;
  console.log(req.body);
  var mysql = new MySQL;

  async.series([
    function(cb){mysql.open(cb)},
    function(cb){
      mysql.query('select a.*,b.megr_name from ims_members as a,ims_members_group as b ' + 
        ' where a.megr_guid=b.megr_guid and memb_loginname=? and memb_pw=md5(?)',
        [loginname,password],cb);
    },
    function(cb){mysql.close(cb)}
    ],function(err,values){
      if(!err){
        if(values[1] && values[1].length>0){
          
          req.session.curruser = {
            memb_guid:values[1][0].memb_guid,
            memb_loginname:values[1][0].memb_loginname,
            memb_name:values[1][0].memb_name,
            megr_guid:values[1][0].megr_guid,
            megr_name:values[1][0].megr_name
          };
           //更新登录时间
          //db.query('update ims_members set memb_lastdate=now() where memb_guid=?',[values[1][0].memb_guid]);
          //记住密码情况    
          if(req.body.rememberme=='true'){
            var auth_token = Util.encrypt(values[1][0].memb_guid + '\t' +
                                          values[1][0].memb_loginname + '\t' +
                                          values[1][0].memb_name + '\t' +
                                          values[1][0].megr_guid + '\t' +
                                          values[1][0].megr_name,config.sessionSecret);
    	    config.debug || console.log(auth_token);
  		    res.cookie(config.cookieSecret,auth_token,{path:'/',maxAge: 1000 * 60 * 60 * 24 * 7});//7天
            
          };
          return res.send(Util.msgBox('登录成功。','/'));
        }
        else{
          res.redirect('/login?again=true');
        }
      }
      else{
        res.redirect('/login?again=true');
      }
      console.log(values)
    }
  );
});


router.get('/fgetpwd',function(req,res,next){
  res.render('login/fgetpwd',{});
});

module.exports = router;
