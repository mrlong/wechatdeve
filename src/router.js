
var express = require('express');
var fs = require('fs');
var router = express.Router();

module.exports = function(parent, options){
  var verbose = options.verbose;
  var baseurl = options.baseurl || '/';  // /admin

  fs.readdirSync(__dirname + '/controllers').forEach(function(name){
    var obj = require('./controllers/' + name);
    var name = obj.name || name;
    var url  = obj.url || name;
    var app  = express();
    
    var method;
    var path;

    app.set('views', __dirname + '/controllers/' + name + '/views');

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

      
      verbose && console.log('     %s %s -> %s', key.toUpperCase(), path, key);
    }

    // mount the app
    parent.use(baseurl,router);
  });
};
