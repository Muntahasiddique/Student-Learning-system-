const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminpanel.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
router.get('/stats', verifyToken, verifyAdmin, getDashboardStats);

module.exports = router;