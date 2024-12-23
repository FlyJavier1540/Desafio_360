/*const express = require('express');
const router = express.Router();
const { getAllUsuarios, insertUsuarios, updateUsuarios, login } = require('../controllers/usuarioController');
const authenticateToken = require('../middleware/auth');

router.get('/', authenticateToken, getAllUsuarios);
router.post('/', insertUsuarios);
router.put('/:id', authenticateToken, getAllUsuarios);
router.post('/login', login);

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const { getAllUsuarios, insertUsuarios, updateUsuarios, login } = require('../controllers/usuarioController');

// Desactivar autenticación temporalmente
router.get('/', getAllUsuarios);
router.post('/', insertUsuarios);
router.put('/:id', updateUsuarios);
router.post('/login', login);

module.exports = router;

