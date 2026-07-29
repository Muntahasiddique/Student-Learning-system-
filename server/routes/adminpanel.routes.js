const express = require("express");
const adminpanelController = require('../controllers/adminpanel.controller')
const router = express.Router();

// Home Page Route
router.get("/adminpanel", adminpanelController.Adminpanelpage)

module.exports = router;
