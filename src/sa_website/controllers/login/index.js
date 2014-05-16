/*
 *
 *  登录后台
 *  mrlong  2014-4-27
 *
 *
 */
var express = require('express');
var router = express.Router();

var MySQL = require('../../../lib/db.js');
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
  console.log(req.session.curruser);
  var mysql = new MySQL;

  async.series([
    function(cb){mysql.open(cb)},
    function(cb){
      mysql.query('select * from ims_members where username=? and password=md5(?)',
        [loginname,password],cb);
    },
    function(cb){mysql.close(cb)}
    ],function(err,values){
      if(!err){
        if(values[1].length>0){
          //记住密码情况
          if(req.body.rememberme=='true'){
            req.session.curruser = values[1][0];
          };
          res.render('index/index',values[1][0]);
        }
        else{
          res.redirect('/login?again=true');
        }
      };
      console.log(values)
    }
  );
});

module.exports = router;