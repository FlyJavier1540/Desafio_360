const express = require('express');
const router = express.Router();
const CategoriaProductosController = require('../controllers/CategoriaProductosController');
const authenticateToken = require('../middleware/auth');

// Rutas de categoría de productos
router.get('/categoriaProductos', authenticateToken, CategoriaProductosController.getAllCategoriaProductos);
router.post('/categoriaProductos', authenticateToken, CategoriaProductosController.insertCategoriaProductos);
router.put('/categoriaProductos/:id', authenticateToken, CategoriaProductosController.updateCategoriaProductos);

module.exports = router;
