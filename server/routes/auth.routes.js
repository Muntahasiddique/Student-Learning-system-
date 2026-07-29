const express = require('express');
const authController = require('../controllers/auth.controller'); // Fix spelling
const router = express.Router();

router.get('/signup', authController.getsignup);
router.post('/signup', authController.signup); // Now correctly references the function
router.get('/login', authController.getLogin);
router.post('/login', authController.login);    // Now correctly references the function

module.exports = router;