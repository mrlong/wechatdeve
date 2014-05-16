
var express = require('express');
var router = express.Router();

router.use('/',function(req,res,next){
	var app = req.app;
    app.set('views',  __dirname +  '/views');
    console.log(app.get('views'));
    console.log('home');
    next();	
});

//控制器列表。
[
	{url:'/',name:'index'}

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;
