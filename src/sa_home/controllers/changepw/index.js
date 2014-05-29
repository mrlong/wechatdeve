/*
 *
 *  修改密码
 *  mrlong  2014-5-23
 *
 *
 */



var express = require('express');
var router = express.Router();
var Obj = require('../../../lib/obj');
var Db = require('../../../lib/db');


router.get('/',function(req,res,next){
	res.render('changepw/index',{});
});

//修改密码
router.post('/do',function(req,res,next){
  //接收参数，xss 处理
  var data = new Obj({
    oldpw: req.body.oldpw,
    newpw: req.body.newpw1,
    guid: req.session.curruser.memb_guid
  });
  
  data.trim().xss();
  
  //写入库内
  Db.query('UPDATE ims_members SET memb_pw=md5(?) WHERE memb_guid=? and memb_pw=md5(?) ',
           [data.newpw,data.guid,data.oldpw],function(err,results){
    if(!err && results.changedRows > 0){
      res.render('changepw/success.html',{req_path:'/home/changepw'});   
    }
    else{
      res.render('changepw/failure.html',{req_path:'/home/changepw',errmsg:'你的原密码不存确'}); 
    }
  });

});




module.exports = router;
