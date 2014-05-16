
var async = require('async');

//顺序执行
async.series([
		function(cb){console.log('1');cb(null,1);},
		function(cb,values){console.log('2');cb(null,2);},
		function(cb){console.log('3');cb(null,3);}
		//function(cb){console.log('3');cb(new Error('出错了'),3);}
	],function(err,values){
	if(err){
		console.log(err);
	}
	else{
		console.log(values);
		console.log('end');
	}
});

//
console.log('======waterfall=======');
async.waterfall([
	function(cb){console.log(1);cb(null,1)},
	function(cb,values){console.log(2);console.log(values);cb(null,2)},
	function(cb,values){console.log(3);console.log(values);cb(null,3)}

],function(err,values){console.log(values)});