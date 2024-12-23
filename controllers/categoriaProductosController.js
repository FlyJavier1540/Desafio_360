const { connectToDB, sql } = require('../config/db');

// Obtener todas las Categorias
const getAllCategoriaProductos = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.CategoriaProductos');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener categorias:", err);
    res.status(500).send("Error al obtener categorias.");
  }
};

// Insertar una nueva Categoria
const insertCategoriaProductos = async (req, res) => {
  const { idCategoriaProductos, idUsuarios, nombre, idEstados } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('idCategoriaProductos', sql.Int, idCategoriaProductos)
      .input('idUsuarios', sql.Int, idUsuarios)
      .input('nombre', sql.NVarChar(45), nombre)
      .input('idEstados', sql.Int, idEstados)
      .query(`
        EXEC dbo.InsertarCategoriaProductos 
        @idCategoriaProductos, @idUsuarios, @nombre, @idEstados)
      `);
    res.status(201).send('Categoria creado exitosamente.');
  } catch (err) {
    console.error("Error al insertar categoria:", err);
    res.status(500).send("Error al insertar categoria.");
  }
};

// Modificar una Categoria
const updateCategoriaProductos = async (req, res) => {
  const { id } = req.params;
  const { idCategoriaProductos, idUsuarios, nombre, marca, codigo, stock, idEstados, precio, foto } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
        .input('idCategoriaProductos', sql.Int, idCategoriaProductos)
        .input('idUsuarios', sql.Int, idUsuarios)
        .input('nombre', sql.NVarChar(45), nombre)
        .input('idEstados', sql.Int, idEstados)
        .query(`
        EXEC dbo.ModificarCategoriaProductos @idCategoriaProductos, @idUsuarios, @nombre, @idEstados
      `);
    res.send('Producto actualizado exitosamente.');
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).send("Error al actualizar producto.");
  }
};

module.exports = {
  getAllCategoriaProductos,
  insertCategoriaProductos,
  updateCategoriaProductos
};