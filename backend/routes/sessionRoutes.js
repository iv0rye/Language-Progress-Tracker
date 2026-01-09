const express = require("express");
const sessionController = require("../controllers/sessionController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, sessionController.addSession);

module.exports = router;