const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course.controller');

router.get('/courses' , CourseController.getAllCourses);
router.post('/courses' , CourseController.createCourse);

module.exports=router;