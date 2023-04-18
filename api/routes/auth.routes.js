const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Route for handling sign-in
router.post("/login", authController.signIn);

module.exports = router;
