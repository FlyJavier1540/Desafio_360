const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');
const authenticateToken = require('../middleware/auth');

router.get('/orden', authenticateToken, ordenController.getAllOrdenes);
router.post('/orden', authenticateToken, ordenController.insertOrden);
router.put('/orden/:id', authenticateToken, ordenController.updateOrden);

module.exports = router;
