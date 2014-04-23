
var express = require('express');
var router = express.Router();
var config = require('../config');

//微信内容
var wechat = require('wechat');
var text = require('./action/text');
var image = require('./action/image');
var location = require('./action/location');
var voice = require('./action/voice');
var video = require('./action/video');
var event = require('./action/event');
var link = require('./action/link');

var API = wechat.API;
var api = new API(config.wechat.appid,config.wechat.appsecret);


/*router.use('/', function(req, res){
 res.send('Hello World-wechat');
});*/

var mywechat = wechat(config.wechat.token, 
  wechat.text(text)      //文本
    .image(image)        //图片
    .location(location)  //位置
    .voice(voice)        //声音
    .video(video)        //视频
    .link(link)      
    .event(event));      //事件

api.createMenu(require('./menuconfig'),function(e){
  
});


router.use('/', mywechat);
module.exports = router;