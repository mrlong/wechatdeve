var express = require('express');
var router = express.Router();

router.use(function(req,res,next){
	var app = req.app;
    app.set('views',  __dirname +  '/views');
    console.log('website');
    console.log(app.get('views'));

    if(req.session.curruser){
    	console.log(req.session.curruser);
    	res.locals.curruser = {
    		groupname:req.session.curruser.groupname,
    		groupid:req.session.curruser.groupid,
    		username:req.session.curruser.username
    	};
    };
     
    next();	
});

//控制器列表。
[
	{url:'/',name:'index'},
	{url:'/login',name:'login'},   //登录
	{url:'/logout',name:'logout'},  //退出
	{url:'/signup',name:'signup'}  //用户注册

].forEach(function(item){
	router.use(item.url,require('./controllers/'+item.name));
});



module.exports = router;
