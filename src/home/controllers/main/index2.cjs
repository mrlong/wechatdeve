
exports.url = 'a';

exports.before = function(req, res, next){
  console.log('before');
  next();
};


exports.get = function(req, res, next){
  //render(res,'./index', {});
  res.render('main/index', {});
};