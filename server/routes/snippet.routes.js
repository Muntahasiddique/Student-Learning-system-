const express = require('express');
const router = express.Router();
const { saveSnippet, getUserSnippets } = require('../controllers/snippet.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// POST /api/snippets - Save a new code snippet
router.post('/', verifyToken, saveSnippet);

// GET /api/snippets - Get logged-in user's snippets
router.get('/', verifyToken, getUserSnippets);

module.exports = router;