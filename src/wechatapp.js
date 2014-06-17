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
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

config.appdir        = __dirname;
config.viewdir       = __dirname + '/public/views';

app.use(logger({ format: 'dev', immediate: true }));
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.engine('html', require('ejs').renderFile);
//app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.set('view cache', false);
app.use(cookieParser());
app.use(session({
	name:'wechatapp',
  secret: config.cookieSecret, 
  key: 'wechatapp', 
  cookie: { secure: false,maxAge: 1000 * 60 * 60 * 24 * 7 }  //7天保存
}));

app.use(function(req, res, next){
  console.log('%s %s %s', req.ip,req.method, req.url);
  next();
});

app.use(function(req,res,next){
	res.locals.config = config;
	next();
});


app.use('/wechat',require('./wechatapi'));
app.use('/',require('./middleware'));     //中间件，用于处理所有请求的必经过的
app.use('/',require('./sa_website'));
app.use('/home',require('./sa_home'));
app.use('/wechatapp',require('./sa_wechat'));


app.use(function(req, res, next){
  res.status(404).render(__dirname+'/public/views/404', {url: req.originalUrl});
});

app.listen(config.port);