const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const {verifyToken} = require('../middleware/auth.middleware');

router.post('/signup' , AuthController.Signup);
router.post('/login' ,AuthController.Login );
router.get('/me', verifyToken, AuthController.UserProfile);

module.exports =router;
