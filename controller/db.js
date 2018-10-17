// mysql配置
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql001",
  multipleStatements:true
});
module.exports = conn;
