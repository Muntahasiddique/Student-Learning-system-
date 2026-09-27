const express = require('express');
const router = express.Router();
const adminpanelController = require('../controllers/adminpanel.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

router.get('/stats', verifyToken, verifyAdmin, adminpanelController.getDashboardStats);
router.get('/users', verifyToken, verifyAdmin, adminpanelController.getAllUsers);
router.get('/courses', verifyToken, verifyAdmin, adminpanelController.getAllCourses);
router.delete('/courses/:id', verifyToken, verifyAdmin, adminpanelController.deleteCourse);
router.put('/courses/:id', verifyToken, verifyAdmin, adminpanelController.updateCourse);
router.put('/users/:id', verifyToken, verifyAdmin, adminpanelController.updateUser);
router.delete('/users/:id', verifyToken, verifyAdmin, adminpanelController.deleteUser);

module.exports = router;