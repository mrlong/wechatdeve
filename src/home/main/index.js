
exports.url = '';

function render(res,html,obj){
  var vp = __dirname+'/views/';
  console.log(vp+html);
  res.render(vp+html, obj);
};


exports.before = function(req, res, next){
  console.log('before');
  next();
};


exports.get = function(req, res, next){
  render(res,'./index', {});
  //res.render('./views/index', {});
};