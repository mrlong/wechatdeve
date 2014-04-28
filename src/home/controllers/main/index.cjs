
exports.url = '';

exports.before = function(req, res, next){
  console.log('before3');
  next();
};


exports.get = function(req, res, next){
  //render(res,'./index', {});
  res.render('main/index', {});
};