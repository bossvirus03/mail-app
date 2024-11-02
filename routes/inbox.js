var express = require("express");
var router = express.Router();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Loi123123",
  database: "wpr2221050657",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", err);
  } else {
    console.log("Kết nối cơ sở dữ liệu thành công");
  }
});
router.get("/", function (req, res, next) {
  console.log(req.session.userId);
  if (!req.session.userId) return res.redirect("/login");
  db.query(
    "SELECT * FROM emails WHERE receiver = ?",
    [req.session.userId],
    (err, emails) => {
      console.log("sdfsdfsdfdsf", emails);
      res.render("inbox", { emails });
    }
  );
});

module.exports = router;
