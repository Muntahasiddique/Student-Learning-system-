const express = require("express");
const editorController = require('../controllers/code-editor.controller')
const router = express.Router();

// Home Page Route
router.get("/editor", editorController.getcodeeditorpage)

module.exports = router;
