var mysql      = require('mysql');
var config = require('../config');

// var connection = mysql.createConnection(config.mysql);

// connection.connect(function(err){
//   console.log(err);
// });

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });

// connection.query('select * from ims_members',function(err,rows){

// 	console.log(rows[0].username);
// });

// connection.end();


//mysql object
console.log('aa');
var mySQL = require('../lib/mysql');
sql = new mySQL;
console.log('11');
sql.open(function(err){
	if(err){
		console.log('打开数据库出错。');
	}
	else{

		var sql2 = new mySQL;
		sql2.test();

  	console.log('test');
  	console.log(sql.escape('some user provided value'));
  	sql.test(); 
  	sql.query('select * from ims_members where memb_name=?',['mrlong'],function(err,rows){
  		if(err){
  			console.log(err);		
  		}
  		else{
  			if (rows.length >0){
  				console.log(rows[0].memb_name);
  			}
  		}
  	});

//  	sql.beginTransaction(function(err){
//  		sql.query('update ims_members set memb_name=?',['mrlong'],function(err,result){
//  			if(err){
//  				console.log(err);
//          sql.rollback();
//  			}
//  			else {
//  				console.log(result.changedRows);
//          sql.commit();
//  			}
//  		});
//  		
//  	});

  	sql.close();
  };
});

mySQL.SqlQuery('select * from ims_members',function(err,result){

});

console.log('22');


