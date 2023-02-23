const mysql = require('mysql2');
const json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'prueba_api'
});

connection.query(
  'SELECT * FROM `usuario`',
  function(err, results,) {
    if(err) {
        console.table("Ocurrio un error: "+ err.sqlMessage);
    }
    else {
        console.log(results); // results contains rows returned by server
        var xls = json2xls(results);
        fs.writeFileSync(path.join(__dirname, 'data.xlsx'), xls, 'binary');
    }
    
    
    // console.log(fields); // fields contains extra meta data about results, if available
  }
);

connection.end();
// with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );