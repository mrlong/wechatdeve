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

var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));
app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/views');

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

app.use(function(req, res, next){
  console.log('%s %s %s', req.ip,req.method, req.url);
  next();
});


app.use('/wechat',require('./wechat/router.js'));
app.use('/admin',require('./admin/router.js'));
app.use('/',require('./home/router.js'));


app.listen(3000);