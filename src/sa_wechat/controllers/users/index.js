/*
 *
 *  公众平台的用户管理
 *  mrlong  2014-6-19
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
  
  
  
  res.render('users/index',{}); 
  
});

router.get('/:guid/reload',function(req,res,nexe){
   var data = new Obj({
    wech_guid : req.params.guid
  });
  data.xss().trim();

  res.render('users/index',{req_path:req.baseUrl});

});



module.exports = router;