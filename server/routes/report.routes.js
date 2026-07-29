const express = require("express");
const reportController = require('../controllers/GradeReport.controller')
const router = express.Router();

// Home Page Route
router.get("/report", reportController.getReport)

module.exports = router;
