const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "fit2024",
  database: process.env.DB_NAME || "wpr12345",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("error to connect to MySQL:", err);
    return;
  }
  console.log("connnected successful to MySQL");
});

module.exports = db;
