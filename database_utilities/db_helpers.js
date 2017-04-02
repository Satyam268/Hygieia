/**
 * Created by mypc on 4/1/2017.
 */
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "192.168.0.26",
    port: "3306",
    user: "Any",
    password: "",
    database: "hygieia"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Database');
        return;
    } console.log('Connection established');
});

var sql = con.query('call sp_test()', function(err, result) {
    if (err) throw err;
    console.log(result.insertId);
});

con.end(function(err) {
    console.log("Closing database connection");
});


