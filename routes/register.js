var express = require("express");
var router = express.Router();
const authController = require("../src/controllers/auth.controller");

router.get("/", authController.getRegisterPage);

router.post("/", authController.postRegister);

module.exports = router;
