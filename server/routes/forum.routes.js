const express = require("express");
const forumController = require('../controllers/forum.controller')
const router = express.Router();

// Home Page Route
router.get("/forum", forumController.getForum)

module.exports = router;
