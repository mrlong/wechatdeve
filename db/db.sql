/*
 *
 * 公众平台的数据库设计
 *
 * 作者：龙仕云 2014-4-22 创建
 * 最后修改时间:
 *  
 * 修改内容:
 *   编号     作者     时间       修改内容
 *
 */

/*公司*/
create table if not exists `ims_members_group` (
  `id` int(10) unsigned not null auto_increment,
  `name` varchar(50) not null comment'公司名称',  
  `modules` varchar(5000) not null default '',
  `templates` varchar(5000) not null default '',
  `maxaccount` int(10) unsigned not null default '0' comment '0为不限制',
  `maxsubaccount` int( 10 ) unsigned not null comment '子公号最多添加数量，为0为不可以添加',
  primary key (`id`)
) engine=myisam  default charset=utf8 comment='公司表';

/*用户信息*/
create table if not exists `ims_members` (
  `uid` int(10) unsigned not null auto_increment comment '用户编号',
  `groupid` int(10) unsigned not null default '0' comment '哪个公司',
  `username` varchar(30) not null comment '用户名',
  `password` varchar(200) not null comment '用户密码,md5码',
  `status` tinyint(4) not null default '0' comment '会员状态，0正常，-1禁用',
  `joindate` timestamp not null default CURRENT_TIMESTAMP comment '注册时间戳',
  `joinip` varchar(15) not null default '',
  `lastvisit` int(10) unsigned not null default '0',
  `lastip` varchar(15) not null default '',
  `remark` varchar(500) not null default '',
  primary key (`uid`),
  unique key `username` (`username`)
) engine=myisam  default charset=utf8 comment='用户表';

-- 用户下面的微信号
 create table if not exists `ims_wechats` (
  `weid` int(10) unsigned not null auto_increment,
  `hash` char(5) not null comment '用户标识. 随机生成保持不重复',
  `type` tinyint(1) unsigned not null default '1' comment '公众号类型，1微信',
  `uid` int(10) unsigned not null comment '关联的用户',
  `groupid` int(10) unsigned not null default '0' comment '哪个公司',
  `token` varchar(32) not null comment '随机生成密钥',
  `access_token` varchar(300) not null default '' comment '存取凭证结构',
  `name` varchar(30) not null comment '公众号名称',
  `account` varchar(30) not null comment '微信帐号',
  `original` varchar(50) not null,
  `signature` varchar(100) not null comment '功能介绍',
 
  primary key (`weid`),
  unique key `hash` (`hash`)
) engine=myisam  default charset=utf8 comment='公众平台微信号';

 /*粉丝*/
 create table if not exists `ims_fans` (
  `id` int(10) unsigned not null auto_increment,
  `weid` int(10) unsigned not null comment '公众号id',
  `from_user` varchar(50) not null comment '用户的唯一身份id',
  `salt` char(8) not null default '' comment '加密盐',
  `follow` tinyint(1) unsigned not null default '1' comment '是否订阅',
  `credit1` int(10) unsigned not null default '0' comment '积分',
  `credit2` double unsigned not null default '0' comment '余额',
  `createtime` int(10) unsigned not null comment '加入时间',
  `realname` varchar(10) not null default '' comment '真实姓名',
  `nickname` varchar(20) not null default '' comment '昵称',
  `avatar` varchar(100) not null default '' comment '头像',
  `qq` varchar(15) not null default '' comment 'qq号',
  `mobile` varchar(11) not null default '' comment '手机号码',
  `fakeid` varchar(30) not null default '',
  `vip` tinyint(3) unsigned not null default '0' comment 'vip级别,0为普通会员',
  `gender` tinyint(1) not null default '0' comment '性别(0:保密 1:男 2:女)',
  `birthyear` smallint(6) unsigned not null default '0' comment '生日年',
  `birthmonth` tinyint(3) unsigned not null default '0' comment '生日月',
  `birthday` tinyint(3) unsigned not null default '0' comment '生日',
  `constellation` varchar(10) not null default '' comment '星座',
  `zodiac` varchar(5) not null default '' comment '生肖',
  `telephone` varchar(15) not null default '' comment '固定电话',
  `idcard` varchar(30) not null default '' comment '证件号码',
  `studentid` varchar(50) not null default '' comment '学号',
  `grade` varchar(10) not null default '' comment '班级',
  `address` varchar(255) not null default '' comment '邮寄地址',
  `zipcode` varchar(10) not null default '' comment '邮编',
  `nationality` varchar(30) not null default '' comment '国籍',
  `resideprovince` varchar(30) not null default '' comment '居住省份',
  `residecity` varchar(30) not null default '' comment '居住城市',
  `residedist` varchar(30) not null default '' comment '居住行政区/县',
  `graduateschool` varchar(50) not null default '' comment '毕业学校',
  `company` varchar(50) not null default '' comment '公司',
  `education` varchar(10) not null default '' comment '学历',
  `occupation` varchar(30) not null default '' comment '职业',
  `position` varchar(30) not null default '' comment '职位',
  `revenue` varchar(10) not null default '' comment '年收入',
  `affectivestatus` varchar(30) not null default '' comment '情感状态',
  `lookingfor` varchar(255) not null default '' comment ' 交友目的',
  `bloodtype` varchar(5) not null default '' comment '血型',
  `height` varchar(5) not null default '' comment '身高',
  `weight` varchar(5) not null default '' comment '体重',
  `alipay` varchar(30) not null default '' comment '支付宝帐号',
  `msn` varchar(30) not null default '' comment 'msn',
  `email` varchar(50) not null default '' comment '电子邮箱',
  `taobao` varchar(30) not null default '' comment '阿里旺旺',
  `site` varchar(30) not null default '' comment '主页',
  `bio` text not null comment '自我介绍',
  `interest` text not null comment '兴趣爱好',
  primary key (`id`),
  key `weid` (`weid`)
) engine=myisam  default charset=utf8;

/*客户服务人*/


/*在线的问题*/



------------------------------------初期化内容-----------------------------
insert into ims_members_group (name,maxsubaccount) values('杭州某某公司',2);
insert into ims_members (groupid,username,password) values(0,'mrlong',MD5('123456'));







