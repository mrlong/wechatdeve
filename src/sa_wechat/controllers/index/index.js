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
  

  res.render('index/index',{datas:null}); 
  
});


module.exports = router;