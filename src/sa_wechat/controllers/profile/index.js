/*
 *
 *  基本资料
 *  mrlong  2014-6-17
 *
 *
 */



var express = require('express');
var router = express.Router();
var Db = require('../../../lib/db');
var Obj = require('../../../lib/obj');

router.get('/:guid',function(req,res,next){
  var data = new Obj({
    wech_guid : req.params.guid
  });
  
  res.render('profile/index',{wech_guid:data.wech_guid});
  
});


module.exports = router;