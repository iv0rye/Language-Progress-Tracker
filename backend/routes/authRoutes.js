const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("sign-up", userController.signUp);
router.post("log-in", userController.logIn);

module.exports = router;