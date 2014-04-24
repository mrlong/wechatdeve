
var express = require('express');
var router = express.Router();


function render(res,html,obj){
	var vp = __dirname+'/views/';
	res.render(vp+html, obj);
};

/*router.use('/', function(req, res, next){
  render(res,'index',{});
});*/



var express = require('express');
var fs = require('fs');
var router = express.Router();

module.exports = function(app, options){
  var verbose = options.verbose;
  var baseurl = options.baseurl || '/';  // /admin

  fs.readdirSync(__dirname).forEach(function(name){
    console.log(name);
    //if (name.indexOf('.js') ==0 ) {continue;};
    var obj = require('./' + name);
    var name = obj.name || name;
    var url = obj.url!=null?obj.url:name;
    var method;
    var path;

    //app.set('views', __dirname +'/'+ name +'/views');
    //obj.views = __dirname + '/views';
    // before middleware support
    if (obj.before) {
      path = url;
      router.all(path, obj.before);
    }

    // generate routes based
    // on the exported methods
    for (var key in obj) {
      // "reserved" exports
      if (~['name', 'url', 'engine', 'before'].indexOf(key)) continue;
      
      path = baseurl + url;
      // route exports
      switch (key) {
        case 'get':
          router.get(path,obj[key]);
          break;
        case 'post':
          router.post(path,obj[key]);
          break;
        default:
          throw new Error('unrecognized route: ' + name + '.' + key);
      }
      
      //console.log('    %s %s -> %s', key.toUpperCase(), path, key);
    };
  });
  
  app.use(baseurl,router);
};







