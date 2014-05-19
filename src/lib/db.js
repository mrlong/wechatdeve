
var mySQL = require('./mysql');

/*
 * 直接执行SQL语言
 * 
 * sql 为语言
 * data 参数
 * callback
 *   err
 *   results   //返回值
 *
 */
exports.query = function(sql,data,callback){
  var mycallback;
  var mydata;
  if (typeof data === 'function'){
    mycallback = data;
    mydata = [];
  }
  else{
    mycallback = callback;
    mydata = data;
  };
  
  var SQL = new mySQL();
  SQL.open(function(err){
    if(err){
      if(mycallback){mycallback(err)}
    }
    else {
      SQL.query(sql,data,function(err,results){
        
        if(mycallback){mycallback(err,results);}
        
      });
      SQL.close();  
    }
    
  });//end open      
};


//mysql = mySQL.createConnection(config.mysql);
//  mysql.connect(function(err){
//    if(err){
//      if(callback){callback(err)}
//    }
//    else{
//      
//      var q = mysql.query(sql,data,function(err,rows){
//        if(err){
//          if(callback){callback(err)}
//        }
//        else{
//          if(callback){callback(null,rows)};   
//        };
//        mysql.end();
//      });
//      config.debug || console.log(q.sql);      
//    }
//  });