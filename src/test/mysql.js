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
var mySQL = require('../lib/db');
sql = new mySQL;
console.log('11');
sql.open(function(){
  console.log('test');
  sql.test(); 
  sql.close();
});
console.log('22');


