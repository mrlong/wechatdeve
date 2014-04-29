/*
 *
 *  登录后台
 *  mrlong  2014-4-27
 *
 *
 */

exports.url = '';
exports.before = function(req,res,next){
  next();
};

exports.get = function(req,res,next){
  res.render('login/login',{});
};

exports.post=function(req,res,next){
  console.log(req.body);
  var loginname = req.body.loginname;
  var password = req.body.password;

  

  res.render('login/loginsuccess',{loginname:loginname,password:password});
}
