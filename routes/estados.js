/*const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estadosController');
const authenticateToken = require('../middleware/auth');

// Rutas de estados
router.get('/', authenticateToken, estadosController.getAllEstados);
router.post('/', authenticateToken, estadosController.insertEstados);
router.put('/:id', authenticateToken, estadosController.updateEstados);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const { getAllEstados, insertEstados, updateEstados } = require('../controllers/estadosController');

// Desactivar autenticación temporalmente
router.get('/', getAllEstados);
router.post('/:id', insertEstados);
router.put('/:id', updateEstados)

module.exports = router;