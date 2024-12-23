const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clientesController');
const authenticateToken = require('../middleware/auth');

// Rutas de clientes
router.get('/cliente', authenticateToken, clienteController.getAllClientes);
router.post('/cliente', authenticateToken, clienteController.insertCliente);
router.put('/cliente/:id', authenticateToken, clienteController.updateCliente);

module.exports = router;
