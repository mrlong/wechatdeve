/*
 *
 *  增加公众账号管理
 *  mrlong  2014-6-15
 *
 *
 */



var express = require('express');
var router = express.Router();
var Obj = require('../../../lib/obj');
var Db = require('../../../lib/db');
var Util = require('../../../lib/util');


router.get('/add',function(req,res,next){
	res.render('wechatmanage/add',{req_path:'/home/wechatmanage/'});
});

//增加
router.post('/add/post',function(req,res,next){
  //1.取出参数
   var data = new Obj({
    wech_name: req.body.wech_name,
    wech_account: req.body.wech_account,
    wech_access_token: req.body.wech_access_token,
    wech_signature:req.body.wech_signature     
  });
  
  data.trim().xss();
  
  data.wech_guid = Util.newGuid();
  data.wech_type = 1;
  data.memb_guid = req.session.curruser.memb_guid;
  data.megr_guid = req.session.curruser.megr_guid;
  data.wech_token = '';
  data.wech_original='';
  Db.query('INSERT INTO ims_wechats SET ?',data,function(err,results){
    //console.log(results);
    if(!err && results.affectedRows>0){
      res.render('wechatmanage/add_success',{req_path:'/home/wechatmanage/',success:true});
    }
    else {
      res.render('wechatmanage/add_success',{req_path:'/home/wechatmanage/',success:false});
    }
  });
  
});

//

module.exports = router;



