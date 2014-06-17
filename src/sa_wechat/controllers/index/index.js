/*
 *
 *  公众平台的主页
 *  mrlong  2014-6-17
 *
 *
 */



var express = require('express');
var router = express.Router();
var Obj = require('../../../lib/obj');
var Db = require('../../../lib/db');

router.get('/:guid',function(req,res,next){
  var data = new Obj({
    wech_guid : req.params.guid
  });
  data.xss().trim();
  
  Db.query('SELECT * FROM ims_wechats where wech_guid=?',[data.wech_guid],function(err,results){
    if(!err && results.length>0){
      
      res.render('index/index',{datas:results[0]});
    }
    else{
      res.render('index/index',{datas:null}); 
    }
  });
  
});


module.exports = router;