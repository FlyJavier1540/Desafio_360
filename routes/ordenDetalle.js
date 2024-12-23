const express = require('express');
const router = express.Router();
const ordenDetalleController = require('../controllers/ordenDetalleController');
const authenticateToken = require('../middleware/auth');

router.post('/ordenDetalle', authenticateToken, ordenDetalleController.insertOrdenDetalle);
router.put('/ordenDetalle/:id', authenticateToken, ordenDetalleController.updateOrdenDetalle);

module.exports = router;
