
////////////////////////////////////////////////////////////////////////
// 作者：龙仕云 
// 路由功能
//
//
///////////////////////////////////////////////////////////////////////

var express = require('express');
var fs = require('fs');
var router = express.Router();


module.exports = function(app, options){
  var baseurl = options.baseurl || '/';  
  fs.readdirSync(__dirname+'/controllers/').forEach(function(name){
    var tmpPath = __dirname + '/controllers/' + name;
    //console.log(tmpPath);
    //目录，遍历子目的文件
    if (fs.statSync(tmpPath).isDirectory()){
      fs.readdir(tmpPath,function(err,files){
        if(!err){
          files.forEach(function(item) {
            var cfilename = tmpPath + '/' + item;
            if (fs.statSync(cfilename).isFile() && cfilename.indexOf('.cjs')>0){
              loadController(cfilename,baseurl);
            };
          });
        };
      });
    };
  });
  app.use(baseurl,router);
};


function loadController(filename,baseurl){

  var obj = require(filename);
  var name = obj.name || name;
  var url = obj.url!=null?obj.url:name;
  var path = baseurl + url;

  // before middleware support
  router.all(path,function(req,res,next){
    var app = req.app;
    app.set('views', __dirname + '/views');
    next();
  });

  if (obj.before) {
    router.all(path, obj.before);
  }

    // generate routes based
    // on the exported methods

  for (var key in obj) {
      // "reserved" exports
    if (~['name', 'url', 'engine', 'before'].indexOf(key)) continue;  

    if (['get', 'post'].indexOf(key)>=0){  
      console.log(key);  
      router[key](path,obj[key]);

      console.log(path+ ':' + key);
    }
    else{
      throw new Error('unrecognized route: ' + name + '.' + key);
    };
  };
};







