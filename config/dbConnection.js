/**
 * Created by yashk on 07-04-2017.
 */
var mysql = require('mysql');
var env = require('./env');

var connection = mysql.createConnection({
    //properties:
    host: env.host,
    user: env.user,
    password:env.password,
    database:env.database
}) ;


connection.connect(function (error) {
    if(!!error){
        console.log('error while connecting to database');
    }
    else{
        console.log('connection with database established');
    }
});

module.exports=connection;