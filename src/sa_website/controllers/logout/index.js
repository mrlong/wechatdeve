/*
 *  退出系统
 *
 */


var express = require('express');
var router = express.Router();
var config = require('../../../config');
var Util = require('../../../lib/util');

router.get('/',function(req,res,next){
  req.session.destroy();
  res.clearCookie(config.cookieSecret, { path: '/' });
  return res.send(Util.msgBox('您已安全退出。','/'));
});

module.exports = router;