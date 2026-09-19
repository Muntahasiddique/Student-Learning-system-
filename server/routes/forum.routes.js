const express = require("express");
const ForumController = require('../controllers/forum.controller');
const router = express.Router();
const {verifyToken} = require('../middleware/auth.middleware'); 

router.post('/' , verifyToken , ForumController.createThread );
router.get('/'  , ForumController.getAllThreads);
router.get('/:id'  , ForumController.getThreadById);
router.post('/:id/reply'  , verifyToken, ForumController.addReply);

module.exports = router;




