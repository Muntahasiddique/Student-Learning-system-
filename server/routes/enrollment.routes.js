const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment.controller');
const {verifyToken}= require('../middleware/auth.middleware');
router.post('/enroll/:courseId' , verifyToken,enrollmentController.enrollCourse);
router.delete('/unenroll/:courseId',verifyToken,enrollmentController.unenrollCourse);
router.get('/my-enrollments', verifyToken, enrollmentController.getMyEnrollments)
module.exports=router;