const express = require("express");
const cousesController = require('../controllers/courses.controller')
const router = express.Router();

// Home Page Route
router.get("/courses", cousesController.getCousespage)

module.exports = router;
