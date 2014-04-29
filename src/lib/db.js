var mySQL  = require('mysql');
var config = require('../config');

//连接mysql 
mysql = function(){
  this.connection  = null;
  this.isconnedted = false;
};

mysql.prototype.open = function(callback){
  this.connection = mySQL.createConnection(config.mysql);
  this.connection.connect(function(err){
    if(err){
      console.error('connect mysql to %s error: ', config.mysql.host, err.message);
      process.exit(1);
    }
    else{
      this.isconnedted = true;
      if (callback) {callback();};
    }
  });
};

mysql.prototype.close = function(){
  if (this.isconnedted == true){
    this.connection.end();  
  };
};

mysql.prototype.test = function(){
  console.log(this.isconnedted);
  if(this.isconnedted==true){
    this.connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
    });
  }
  else{
    console.log('没有打开数据库，请执行open。');
  };
};


module.exports=mysql;