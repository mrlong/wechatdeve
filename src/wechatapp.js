/*
 *
 *  作者：龙仕云  2014－4－22 
 *
 *  入口
 * 使用第三方包文件：
 *    1.express 4.x
 *    2.ejs
 *
 *
 */

var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.engine('html', require('ejs').renderFile);
//app.set('views', __dirname + '/views');
app.set('view engine', 'html');

if (config.debug==true){
  app.set('view cache', false);
}
else{
  app.set('view cache', true);
};

app.use(function(req, res, next){
  console.log('%s %s %s', req.ip,req.method, req.url);
  next();
});

app.use('/wechat',require('./wechat/router.js'));
require('./router')(app);
//require('./home/router')(app, {baseurl:'/'});

//require('./router')(app, { verbose: !module.parent});

//app.use('/admin',require('./admin/router.js'));
//app.use('/',require('./home/router.js'));

app.use(function(req, res, next){
  res.status(404).render(__dirname+'/public/views/404', {url: req.originalUrl});
});

app.listen(config.port);