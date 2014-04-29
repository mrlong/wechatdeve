
var mysql = require('mysql');
var config = require('../config');

//连接mysql 
var connection = mysql.createConnection(config.mysql);
connection.connect(function(err){
  if(err){
    console.error('connect mysql to %s error: ', config.mysql.host, err.message);
    process.exit(1);
  };
});


//各表的引出类
// models



