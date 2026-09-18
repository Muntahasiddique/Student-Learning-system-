const express = require('express');
const router = express.Router();
const  DegreeController= require('../controllers/degree.controller');
const {verifyToken} = require('../middleware/auth.middleware');
router.get('/progress' ,verifyToken, DegreeController.getDegreeProgress );
module.exports=router;