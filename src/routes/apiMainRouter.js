const express = require("express");
const router = express.Router();

const mainController = require("../api/mainController")

router.get("/", mainController.home)

module.exports = router