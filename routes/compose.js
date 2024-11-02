const express = require("express");
const router = express.Router();
const composeController = require("../src/controllers/compose.controller.js");

router.get("/", composeController.getComposePage);
router.post("/", composeController.postCompose);

module.exports = router;
