var  mongodb = require('mongodb');
var  server  = new mongodb.Server('127.0.0.1', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('home', server, {safe:true});
var mysql = require('mysql');
//mysql's database and table
var TEST_DATABASE = 'home'; 
var TEST_TABLE = 'home_sensor'; 
//连接mysql


var client = mysql.createConnection({ 
  host     : '115.29.109.27',
  user     : 'root',
  password : 'MonkeyGuard309',
  port: '3306',
  database: 'home'
}); 


var now = new Date();

var myTime = now.toLocaleDateString();;
console.log(myTime);

//连接db
db.open(function(err, db){
    if(!err){
        console.log('connect db');
        // 连接Collection（可以认为是mysql的table）
        // 第1种连接方式
        // db.collection('mycoll',{safe:true}, function(err, collection){
        //     if(err){
        //         console.log(err);
        //     }
        // });
        // 第2种连接方式
        db.createCollection('home', {safe:true}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                //新增数据
                // var tmp1 = {id:'1',title:'hello',number:1};
       //          collection.insert(tmp1,{safe:true},function(err, result){
       //              console.log(result);
       //          }); 
                   //更新数据
                   // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                   //     console.log(result);
                   // });
                   // 删除数据
                       // collection.remove({title:'hello'},{safe:true},function(err,result){
        //                   console.log(result);
        //               });

                // console.log(collection);
                // 查询数据
                   /*var tmp1 = {temp_value:'456'};
                   var tmp2 = {fire_value:'1234'};
				   var tmp3 = {fog_value:'12'};
                   collection.insert([tmp1,tmp2,tmp3],{safe:true},function(err,result){
                   console.log(result);
                   }); */
                   collection.find(function(err,cursor){
                       // console.log('find');
                       cursor.each(function (err, item) {
                            if(item){
                                // console.dir("temp " + item.temp_value);
                                // console.dir("fire " + item.fire_value);
                                // console.dir("fog " + item.fog_value);
                                var insertSOL = "insert into home( sensor, num, time) VALUES( ?, ?, ?)";
                                var paramTemp = ["temp", item.temp_value, myTime];
                                var paramFire = ["fire", item.fire_value, myTime];
                                var paramFog = ["fog", item.fog_value, myTime];
                                client.query(insertSOL, paramTemp, function (err, result) {
                                    if(err){
                                        console.log("[insert error]" + err.message);
                                        return;
                                    }
                                });
                                client.query(insertSOL, paramFire, function (err, result) {
                                    if(err){
                                        console.log("[insert error]" + err.message);
                                        return;
                                    }
                                });
                                client.query(insertSOL, paramFog, function (err, result) {
                                    if(err){
                                        console.log("[insert error]" + err.message);
                                        return;
                                    }
                                });



                            }
                       });
				   
                   }); 
                   /*collection.findOne(function(err,doc){
                    console.log('findOne');
                      console.log(doc.temp_value);
                   });*/
            }

        });
        // console.log('delete ...');
        // //删除Collection
        // db.dropCollection('mycoll',{safe:true},function(err,result){

  //           if(err){
                
        //         console.log('err:');
        //         console.log(err);
        //     }else{
        //         console.log('ok:');
        //         console.log(result);
        //     }
  //       }); 
    }else{
        console.log(err);
    }
});