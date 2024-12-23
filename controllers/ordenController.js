const { connectToDB, sql } = require('../config/db');

// Obtener todas las ordenes
const getAllOrdenes = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.Orden');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener órdenes:", err);
    res.status(500).send("Error al obtener órdenes.");
  }
};

// Crear una nueva Orden
const insertOrden = async (req, res) => {
  const { id, idUsuario, idEstados, nombre, direccion, telefono, correo, fechaEntrega, totalOrden } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('idUsuario', sql.Int, idUsuario)
      .input('idEstados', sql.Int, idEstados)
      .input('nombre', sql.NVarChar(245), nombre)
      .input('direccion', sql.NVarChar(545), direccion)
      .input('telefono', sql.NVarChar(45), telefono)
      .input('correo', sql.NVarChar(45), correo)
      .input('fechaEntrega', sql.Date, fechaEntrega)
      .input('totalOrden', sql.Float, totalOrden)
      .query(`
        EXEC dbo.InsertarOrden 
        @id, @idUsuario, @idEstados, @nombre, @direccion, @telefono, @correo, @fechaEntrega, @totalOrden
      `);
    res.status(201).send('Orden creada exitosamente.');
  } catch (err) {
    console.error("Error al insertar orden:", err);
    res.status(500).send("Error al insertar orden.");
  }
};


// Modificar una Orden
const updateOrden = async (req, res) => {
  const { id } = req.params;
  const { idUsuario, idEstados, nombre, direccion, telefono, correo, fechaEntrega, totalOrden } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('idUsuario', sql.Int, idUsuario)
      .input('idEstados', sql.Int, idEstados)
      .input('nombre', sql.NVarChar(245), nombre)
      .input('direccion', sql.NVarChar(545), direccion)
      .input('telefono', sql.NVarChar(45), telefono)
      .input('correo', sql.NVarChar(45), correo)
      .input('fechaEntrega', sql.Date, fechaEntrega)
      .input('totalOrden', sql.Float, totalOrden)
      .query(`
        EXEC dbo.ModificarOrden 
        @id, @idUsuario, @idEstados, @nombre, @direccion, @telefono, @correo, @fechaEntrega, @totalOrden
      `);
    res.send('Orden actualizada exitosamente.');
  } catch (err) {
    console.error("Error al actualizar orden:", err);
    res.status(500).send("Error al actualizar orden.");
  }
};


module.exports = {
  getAllOrdenes,
  insertOrden,
  updateOrden
};