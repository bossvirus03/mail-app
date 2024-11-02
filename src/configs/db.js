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
    console.error("Lỗi kết nối tới MySQL:", err);
    return;
  }
  console.log("Đã kết nối tới cơ sở dữ liệu MySQL");
});

module.exports = db;
