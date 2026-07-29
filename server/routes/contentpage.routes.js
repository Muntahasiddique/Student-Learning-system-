const express = require("express");
const contentController = require('../controllers/content.controller')
const router = express.Router();

router.get("/dsa", contentController.getdsapage)

module.exports = router;
