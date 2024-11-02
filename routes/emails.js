const express = require("express");
const router = express.Router();
const emailController = require("../src/controllers/email.controller.js");

router.get("/:id", emailController.getEmailDetail);
router.delete("/:id", emailController.deleteEmail);

module.exports = router;
