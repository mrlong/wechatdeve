var db = require('../lib/db');

db.query('select UUID();',function(err,results){
  if(err){
    console.log(err);
  }
  else{
    console.log(results); 
  }

});


db.query('select * from ims_members where memb_name=?',['mrlong'],function(err,results){
  if(err){
    console.log(err);
  }
  else{
    console.log(results); 
  }

});




