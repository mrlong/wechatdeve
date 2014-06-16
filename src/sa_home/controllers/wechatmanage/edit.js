/*
 *
 *  编辑公众账号管理
 *  mrlong  2014-6-16
 *
 *
 */



var express = require('express');
var router = express.Router();
var Obj = require('../../../lib/obj');
var Db = require('../../../lib/db');
var Util = require('../../../lib/util');


router.get('/edit/:guid',function(req,res,next){
  var data = new Obj({
    wech_guid:req.params.guid
  });
  
  data.xss().trim();
  
  Db.query('SELECT * FROM ims_wechats WHERE wech_guid=?',[data.wech_guid],function(err,results){
    console.log(results);
    if(!err && results.length>0){
      res.render('wechatmanage/edit',{req_path:'/home/wechatmanage/',datas:results[0]});
    }
    else {
      res.render('wechatmanage/edit',{req_path:'/home/wechatmanage/',datas:null});
    };
  
  });
  
  
});

router.post('/edit/post',function(req,res,next){
  var data = new Obj({
    wech_guid:req.body.wech_guid,
    wech_name:req.body.wech_name,
    wech_account:req.body.wech_account,
    wech_access_token:req.body.wech_access_token,
    wech_signature:req.body.wech_signature
  });
  
  data.xss().trim();
  var myguid = data.wech_guid; delete data.wech_guid;
  Db.query('UPDATE ims_wechats SET ? where wech_guid=?',[data,myguid],function(err,results){
    //console.log(results);
    if(!err && results.changedRows>0){
      res.render('wechatmanage/edit_success',{req_path:'/home/wechatmanage/',success:true});
    }
    else {
      res.render('wechatmanage/edit_success',{req_path:'/home/wechatmanage/',success:false});
    };
  });
  

});

module.exports = router;