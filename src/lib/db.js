////////////////////////////////////////////////////////////
//
//  mysql 数据库的封装
//  作者: 龙仕云 2014－4－30
//
//
//
///////////////////////////////////////////////////////////

var mySQL  = require('mysql');
var config = require('../config');

//连接mysql 
mysql = function(){
  this.connection  = null;
};

//
// callback:
//   err   
//
//
mysql.prototype.open = function(callback){
  this.connection = mySQL.createConnection(config.mysql);
  this.connection.connect(function(err){
    if(err){
      if(callback){callback(err)}
      //console.error('connect mysql to %s error: ', config.mysql.host, err.message);
      //process.exit(1);
    }
    else{
      if (callback) {callback(null);};
    }
  });
};

mysql.prototype.close = function(){
  if (this.connection){
    this.connection.end();  
  };
};

/*
 *  1. sql.query('select * from ims_members where username=?',['mrlong'],function(err,result){
 *     if(err){
 * 
 *     }
 *     else{
 * 
 *     });
 *
 * 2. var post  = {id: 1, title: 'Hello MySQL'};
 *    mysql.query('INSERT INTO posts SET ?', post, function(err, result) {
 *  
 *     //..
 * 
 *    }); INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
 *
 *
 * 3. mysql.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
 *       if (err) throw err;
 *
 *       console.log(result.insertId);
 *    });
 *
 * 4. mysql.query('DELETE FROM posts WHERE title = "wrong"', function (err, result) {
 *      if (err) throw err;
 *
 *      console.log('deleted ' + result.affectedRows + ' rows');
 *    })
 *
 *
 * 5. mysql.query('UPDATE posts SET ...', function (err, response) {
 *     if (err) throw err;
 *
 *     console.log('changed ' + result.changedRows + ' rows');
 *    })
 */

mysql.prototype.query = function(sql,data,callback){
  if(this.connection){
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

    this.connection.query(sql,data,function(err,rows){
      if(err){
        if(callback){callback(err,null)}
      }
      else{
        if(callback){callback(null,rows)};   
      }
    });
  }
  else{
    if(callback){callback(new Error('没有打开数据库，请执行open。'),null)}
  }
};

/*
 * var userId = 'some user provided value';
 *  var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
 * mysql.query(sql, function(err, rows) {
 *  
 *  ...
 *
 *  });
 */
mysql.prototype.escape=function(txt){
  if(this.connection){
    return this.connection.escape(txt);
  }
  else{
    return txt;
  }
}

mysql.prototype.test = function(){
  if(this.connection){
    this.connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
    });
  }
  else{
    console.log('没有打开数据库，请执行open。');
  };
};

/*
 * callback(err)
 *  
 *
 *
 */
mysql.prototype.beginTransaction=function(callback){
  if(this.connection){
    this.connection.beginTransaction(callback);
  }
  else{
    if(callback){callback(new Error('没有打开数据库，请执行open。'),null)};
  }
};

/*
 * callback(err)
 *  
 *
 *
 */
mysql.prototype.commit=function(callback){
  if(this.connection){
    this.connection.commit(callback);
  }
  else{
    if(callback){callback(new Error('没有打开数据库，请执行open。'))};
  }
};

/*
 * callback(err)
 *  
 *
 *
 */
mysql.prototype.rollback=function(callback){
  if(this.connection){
    if(callback){
      this.connection.rollback(callback);
    }
    else{
      this.connection.rollback(function(err){});
    }
  }
  else{
    if(callback){callback(new Error('没有打开数据库，请执行open。'),null)};
  }
};



module.exports=mysql;