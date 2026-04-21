// backend/src/routes/auditRoutes.js
const express = require('express');
const router = express.Router();
const { processAudit } = require('../controllers/auditController');

router.post('/', processAudit);
router.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = router;