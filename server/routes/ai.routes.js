const express = require('express');
const router = express.Router();
const { askAITutor } = require('../controllers/ai.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// POST /api/ai/ask - Get answer from AI Tutor (Protected)
router.post('/ask', verifyToken, askAITutor);

module.exports = router;