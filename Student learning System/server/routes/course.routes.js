const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/course.controller');

router.get('/courses' , CourseController.getAllCourses);
router.post('/courses' , CourseController.createCourse);
router.get('/courses/:id' , CourseController.getCourseById);
router.put('/courses/:id' , CourseController.updateCourse);
router.delete('/courses/:id',CourseController.deleteCourse)
module.exports=router;