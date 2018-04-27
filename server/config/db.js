const mysql = require('mysql');
module.exports = mysql.createConnection({
  host: "127.0.1.1",
  user: "root",
  port: "3306",
  password: "patinete",
  database: "pomusdb"
});