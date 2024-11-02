var express = require("express");
var router = express.Router();

const db = require("./../src/configs/db");
router.get("/", function (req, res, next) {
  if (!req.session.userId) return res.redirect("/login");
  db.query(
    "SELECT * FROM emails WHERE receiver = ?",
    [req.session.userId],
    (err, emails) => {
      res.render("inbox", { emails });
    }
  );
});

module.exports = router;
