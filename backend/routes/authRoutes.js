const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", authController.register);

router.post("/log-in", authController.logIn);

router.post("/log-out", authController.logOut);

router.get("/me", protect, authController.returnCurrentUser);

module.exports = router;