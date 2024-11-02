const express = require("express");
const router = express.Router();
const sentController = require("../src/controllers/sent.controller.js");

router.get("/", sentController.getSentPage);

module.exports = router;
