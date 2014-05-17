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
var Util  = require('../../../lib/Util');
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
      mysql.query('select a.*,b.name from ims_members as a,ims_members_group as b ' + 
        ' where a.groupid=b.id and username=? and password=md5(?)',
        [loginname,password],cb);
    },
    function(cb){mysql.close(cb)}
    ],function(err,values){
      if(!err){
        if(values[1].length>0){
          //记住密码情况
          req.session.curruser = {
            username:values[1][0].username,
            groupid:values[1][0].groupid,
            groupname:values[1][0].name
          };

          // if(req.body.rememberme=='true'){
          //   req.session.curruser = values[1][0];
          // };
          return res.send(Util.msgBox('登录成功。','/'));
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
