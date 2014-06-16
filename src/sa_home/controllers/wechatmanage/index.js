/*
 *
 *  公众账号管理，用于生成多个公众账号功能
 *  mrlong  2014-6-15
 *
 *
 */



var express = require('express');
var router = express.Router();
var Db = require('../../../lib/db');

router.get('/',function(req,res,next){
    var data={};
    data.memb_guid = req.session.curruser.memb_guid;
    data.megr_guid = req.session.curruser.megr_guid;
    
    Db.query('SELECT * FROM ims_wechats where megr_guid=?',[data.megr_guid],function(err,results){
      console.log(results);
      
      if(!err){
           res.render('wechatmanage/index',{datas:results});
      }
      else{
        res.render('wechatmanage/index',{datas:null});
      }
    });
  
	
});


//增加
router.use(require('./add.js'));

module.exports = router;
