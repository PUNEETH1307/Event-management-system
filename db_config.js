const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PUNEE13@work", // your password
  database: "event_management"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

module.exports = db;