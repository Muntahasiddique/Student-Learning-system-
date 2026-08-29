const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post('/signup' , AuthController.Signup);
router.post('/login' ,AuthController.Login )

module.exports =router;
