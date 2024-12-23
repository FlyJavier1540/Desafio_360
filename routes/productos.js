const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const authenticateToken = require('../middleware/auth');

// Rutas de productos
router.get('/productos', authenticateToken, productosController.getAllProducts);
router.post('/productos', authenticateToken, productosController.insertProduct);
router.put('/productos/:id', authenticateToken, productosController.updateProduct);

module.exports = router;
