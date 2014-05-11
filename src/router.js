
var express = require('express');
var fs = require('fs');
var router = express.Router();
var subapp = require('./subapp');

module.exports = function(app){
  subapp.forEach(function(item){
    var sysdir = __dirname + '/' + item.name;
    loadSubSystem(app,{baseurl:item.baseurl},sysdir);
  });
};


//加载子系统。
function loadSubSystem(app, options,sysdir){
  var baseurl = options.baseurl || '/';  
  fs.readdirSync(sysdir+'/controllers/').forEach(function(name){
    var tmpPath = sysdir + '/controllers/' + name;
    //console.log(tmpPath);
    //目录，遍历子目的文件
    if (fs.statSync(tmpPath).isDirectory()){
      fs.readdir(tmpPath,function(err,files){
        if(!err){
          files.forEach(function(item) {
            var cfilename = tmpPath + '/' + item;
            if (fs.statSync(cfilename).isFile() && cfilename.indexOf('.cjs')>0){
              loadController(cfilename,baseurl,sysdir,name);
              
            };
          });
        };
      });
    };
  }); //end fs
  app.use(baseurl,router);
};


function loadController(filename,baseurl,sysdir,name){

  var obj = require(filename);
  var name = obj.name || name;
  var url = obj.url!=null?obj.url:name;  //如没有写url则按目录名来。
  var path = baseurl + url;

  // before middleware support
  router.all(path,function(req,res,next){
    var app = req.app;
    app.set('views', sysdir + '/views');
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
    if (path==='') continue;

    if (['get', 'post'].indexOf(key)>=0){  
      console.log('key:' + key);  
      router[key](path,obj[key]);

      console.log(path+ ':' + key);
    }
    else{
      throw new Error('unrecognized route: ' + name + '.' + key);
    };
  };
};
