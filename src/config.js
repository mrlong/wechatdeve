/*
 * 系统配置文件
 *
 *  作者：龙仕云 2014-4-23
 */


 module.exports = { 
  title: 'mrlong.cn',
  company:'龙仕云',
  debug:false,
  port: 3004,
  sessionSecret:'sfi$sf#@*s',  //cookie加密key
  cookieSecret:'mrlong.cn',
  wechat:{
    token:"mrlongwechat",
    appid:"wx4e1abb249fe9b751",
    appsecret:"eace164dedd242dfc74b9a79b9bbd0c7"
  },
  mysql:{
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : '',
    database : 'wechat'
  }
}; 

