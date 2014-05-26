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
  `megr_guid` varchar(50) not null ,
  `megr_name` varchar(50) not null comment'公司名称',  
  `megr_modules` varchar(5000) not null default '',
  `megr_templates` varchar(5000) not null default '',
  `megr_maxaccount` int(10) unsigned not null default '0' comment '0为不限制',
  `megr_maxsubaccount` int( 10 ) unsigned not null comment '子公号最多添加数量，为0为不可以添加',
  primary key (`megr_guid`)
) engine=myisam  default charset=utf8 comment='公司表';

/*用户信息*/
create table if not exists `ims_members` (
  `memb_guid` varchar(50) not null  comment '用户编一号',
  `megr_guid` varchar(50) not null  comment '哪个公司',
  `memb_name` varchar(30) not null comment '用户名',
  `memb_pw` varchar(200) not null comment '用户密码,md5码',
  `memb_status` tinyint(4) not null default '0' comment '会员状态，0正常，-1禁用',
  `memb_joindate` timestamp not null default CURRENT_TIMESTAMP comment '注册时间戳',
  `memb_joinip` varchar(15) not null default '',
  `memb_lastdate` datetime ,
  `memb_lastip` varchar(15) not null default '',
  `memb_remark` varchar(500) not null default '',
  primary key (`memb_guid`,megr_guid),
  unique key `memb_name` (`memb_name`)
) engine=myisam  default charset=utf8 comment='用户表';

/*用户下面的微信号*/
 create table if not exists `ims_wechats` (
  `wech_guid` varchar(50)  not null comment '用户标识. 随机生成保持不重复',
  `wech_type` tinyint(1) unsigned not null default '1' comment '公众号类型，1微信',
  `memb_guid` varchar(50) not null comment '关联的用户',
  `megr_guid` varchar(50) not null comment '哪个公司',
  `wech_token` varchar(32) not null comment '随机生成密钥',
  `wech_access_token` varchar(300) not null default '' comment '存取凭证结构',
  `wech_name` varchar(30) not null comment '公众号名称',
  `wech_account` varchar(30) not null comment '微信帐号',
  `wech_original` varchar(50) not null,
  `wech_signature` varchar(100) not null comment '功能介绍',
 
  primary key (`wech_guid`)
) engine=myisam  default charset=utf8 comment='公众平台微信号';

 /*粉丝*/
 create table if not exists `ims_fans` (
  `fans_guid` varchar(50) not null ,
  `wech_guid` varchar(50) not null comment '公众号id',
  `fans_openid` varchar(50) not null comment '用户的唯一身份id',
  `fans_salt` char(8) not null default '' comment '加密盐',
  `fans_follow` tinyint(1) unsigned not null default '1' comment '是否订阅',
  `fans_credit1` int(10) unsigned not null default '0' comment '积分',
  `fans_credit2` double unsigned not null default '0' comment '余额',
  `fans_createtime` int(10) unsigned not null comment '加入时间',
  `fans_realname` varchar(10) not null default '' comment '真实姓名',
  `fans_nickname` varchar(20) not null default '' comment '昵称',
  `fans_avatar` varchar(100) not null default '' comment '头像',
  `fans_qq` varchar(15) not null default '' comment 'qq号',
  `fans_mobile` varchar(11) not null default '' comment '手机号码',
  `fans_fakeid` varchar(30) not null default '',
  `fans_vip` tinyint(3) unsigned not null default '0' comment 'vip级别,0为普通会员',
  `fans_gender` tinyint(1) not null default '0' comment '性别(0:保密 1:男 2:女)',
  `fans_birthyear` smallint(6) unsigned not null default '0' comment '生日年',
  `fans_birthmonth` tinyint(3) unsigned not null default '0' comment '生日月',
  `fans_birthday` tinyint(3) unsigned not null default '0' comment '生日',
  `fans_constellation` varchar(10) not null default '' comment '星座',
  `fans_zodiac` varchar(5) not null default '' comment '生肖',
  `fans_telephone` varchar(15) not null default '' comment '固定电话',
  `fans_idcard` varchar(30) not null default '' comment '证件号码',
  `fans_studentid` varchar(50) not null default '' comment '学号',
  `fans_grade` varchar(10) not null default '' comment '班级',
  `fans_address` varchar(255) not null default '' comment '邮寄地址',
  `fans_zipcode` varchar(10) not null default '' comment '邮编',
  `fans_nationality` varchar(30) not null default '' comment '国籍',
  `fans_resideprovince` varchar(30) not null default '' comment '居住省份',
  `fans_residecity` varchar(30) not null default '' comment '居住城市',
  `fans_residedist` varchar(30) not null default '' comment '居住行政区/县',
  `fans_graduateschool` varchar(50) not null default '' comment '毕业学校',
  `fans_company` varchar(50) not null default '' comment '公司',
  `fans_education` varchar(10) not null default '' comment '学历',
  `fans_occupation` varchar(30) not null default '' comment '职业',
  `fans_position` varchar(30) not null default '' comment '职位',
  `fans_revenue` varchar(10) not null default '' comment '年收入',
  `fans_affectivestatus` varchar(30) not null default '' comment '情感状态',
  `fans_lookingfor` varchar(255) not null default '' comment ' 交友目的',
  `fans_bloodtype` varchar(5) not null default '' comment '血型',
  `fans_height` varchar(5) not null default '' comment '身高',
  `fans_weight` varchar(5) not null default '' comment '体重',
  `fans_alipay` varchar(30) not null default '' comment '支付宝帐号',
  `fans_msn` varchar(30) not null default '' comment 'msn',
  `fans_email` varchar(50) not null default '' comment '电子邮箱',
  `fans_taobao` varchar(30) not null default '' comment '阿里旺旺',
  `fans_site` varchar(30) not null default '' comment '主页',
  `fans_bio` text not null comment '自我介绍',
  `fans_interest` text not null comment '兴趣爱好',
  primary key (`fans_guid`),
  key `wech_guid` (`wech_guid`)
) engine=myisam  default charset=utf8;

/*客户服务人*/


/*在线的问题*/



/*------------------------------------初期化内容-----------------------------*/
insert into ims_members_group (megr_guid,megr_name,megr_maxsubaccount) values('200eb386-df5a-11e3-882d-fabab65fb985','杭州某某公司',2);
insert into ims_members (megr_guid,memb_guid,memb_name,memb_pw) values('200eb386-df5a-11e3-882d-fabab65fb985','d6b4263e-df5a-11e3-882d-fabab65fb985 ','mrlong',MD5('123456'));







