const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.post("/", protect, sessionController.addSession);

module.exports = router;