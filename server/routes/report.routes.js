const express = require("express");
const reportController = require('../controllers/GradeReport.controller')
const router = express.Router();
const {verifyToken,verifyAdmin}= require('../middleware/auth.middleware');

// Home Page Route
router.post("/report", verifyToken , verifyAdmin , reportController.GradeReport);
router.get("/getreport", verifyToken, reportController.getStudentGrades);



module.exports = router;
