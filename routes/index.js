var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session.userId) {
    return res.redirect("/inbox");
  } else {
    res.render("login", { message: "" });
  }
});

module.exports = router;
