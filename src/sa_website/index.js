var express = require('express');
var router = express.Router();

router.use('/',function(req,res,next){
	var app = req.app;
    app.set('views',  __dirname +  '/views');
    console.log('website');
    console.log(app.get('views'));
    next();	
});

//控制器列表。
[
	{url:'/',name:'index'},
	{url:'/login',name:'login'}

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;
