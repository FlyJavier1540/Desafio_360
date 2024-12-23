const { connectToDB, sql } = require('../config/db');

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.Productos');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos.");
  }
};

// Insertar un nuevo producto
const insertProduct = async (req, res) => {
  const { id, idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('idCategoriaProductos', sql.Int, idCategoriaProductos)
      .input('idUsuarios', sql.Int, idUsuarios)
      .input('nombre', sql.NVarChar(45), nombre)
      .input('marca', sql.NVarChar(45), marca)
      .input('codigo', sql.NVarChar(45), codigo)
      .input('stock', sql.Float, stock)
      .input('idEstados', sql.Int, idEstados)
      .input('precio', sql.Float, precio)
      .input('foto', sql.Binary(50), foto)
      .query(`
        EXEC dbo.InsertarProductos 
        @id, @idCategoriaProductos, @idUsuarios, @nombre, @marca, @codigo, @stock, @idEstados, @precio, @foto)
      `);
    res.status(201).send('Producto creado exitosamente.');
  } catch (err) {
    console.error("Error al insertar producto:", err);
    res.status(500).send("Error al insertar producto.");
  }
};

// Modificar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('idCategoriaProductos', sql.Int, idCategoriaProductos)
      .input('idUsuarios', sql.Int, idUsuarios)
      .input('nombre', sql.NVarChar(45), nombre)
      .input('marca', sql.NVarChar(45), marca)
      .input('codigo', sql.NVarChar(45), codigo)
      .input('stock', sql.Float, stock)
      .input('idEstados', sql.Int, idEstados)
      .input('precio', sql.Float, precio)
      .input('foto', sql.Binary(50), foto)
      .query(`
        EXEC dbo.ModificarProducto @nombre, @marca, @codigo, @stock, @idEstados, @precio, @foto
        WHERE idProductos = @id
      `);
    res.send('Producto actualizado exitosamente.');
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).send("Error al actualizar producto.");
  }
};

module.exports = {
  getAllProducts,
  insertProduct,
  updateProduct
};