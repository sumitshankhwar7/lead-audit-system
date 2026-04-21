const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Move specific routes BEFORE parameterized routes
router.get('/download/:id', reportController.downloadReport);
router.get('/:id', reportController.getReport);

module.exports = router;
