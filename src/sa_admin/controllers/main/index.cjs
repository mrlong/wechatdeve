/*
 *
 *  后台管理内容
 *  mrlong  2014-4-27
 *
 *
 */



exports.before = function(req, res, next){
  next();
};


exports.get = function(req, res, next){
  //render(res,'./index', {});
  res.render('main/index', {});
};
