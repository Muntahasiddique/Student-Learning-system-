const express = require("express");
const degreeController = require('../controllers/degree.controller')
const router = express.Router();

// Home Page Route
router.get("/degree", degreeController.getDegree)

module.exports = router;
