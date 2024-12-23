const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ordeRoutes = require('./routes/orden');
const ordenDetalleRoutes = require('./routes/ordenDetalle');
const usuarioRoutes = require('./routes/usuario');
const productosRoutes = require('./routes/productos');
const categoriaProductosRoutes = require('./routes/categoriaProductos');
const estadosRoutes = require('./routes/estados');
const clienteRoutes = require('./routes/cliente');

// Definición de variables directamente en el código
const SESSION_SECRET = 'your_session_secret';
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Rutas
app.use('/desafio360/orden', ordeRoutes);
app.use('/desafio360/ordenDetalle', ordenDetalleRoutes);
app.use('/desafio360/usuario', usuarioRoutes);
app.use('/desafio360/productos', productosRoutes);
app.use('/desafio360/categoriaProductos', categoriaProductosRoutes);
app.use('/desafio360/estados', estadosRoutes);
app.use('/desafio360/cliente', clienteRoutes);

// Puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

