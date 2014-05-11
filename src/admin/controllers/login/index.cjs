/*
 *
 *  登录后台
 *  mrlong  2014-4-27
 *
 *
 */

var MySQL = require('../../../lib/db.js');

exports.url = '';
exports.before = function(req,res,next){
  next();
};

exports.get = function(req,res,next){
	var again = req.query.again||false;
	console.log(again);
  res.render('login/login',{again:again});
};

exports.post=function(req,res,next){
  console.log(req.body);
  var loginname = req.body.loginname;
  var password = req.body.password;

  var mysql = new MySQL;
  mysql.open(function(err){
  	if(!err){
  		mysql.query('select * from ims_members where username=? and password=md5(?)',
  			[loginname,password],function(err,result){
  				if(err || result.length==0){
  					res.redirect('/admin?again=true');
  				}
  				else{
  					res.render('login/loginsuccess',{loginname:loginname,password:password});
  				}
  			});
  	}
  	mysql.close(); //?????注意异步情况
  });
  //res.redirect('/admin?again=true');    
}
