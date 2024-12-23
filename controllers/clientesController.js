const { connectToDB, sql } = require('../config/db');

// Obtener todos los clientes
const getAllClientes = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.Cliente');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener cliente:", err);
    res.status(500).send("Error al obtener cliente.");
  }
};

// Insertar un nuevo cliente
const insertCliente = async (req, res) => {
  const { id, razonSocial, nombreComercial, direccionEntrega, telefono, email } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('razonSocial', sql.NVarChar(245), razonSocial)
      .input('nombreComercial', sql.NVarChar(345), nombreComercial)
      .input('direccionEntrega', sql.NVarChar(45), direccionEntrega)
      .input('telefono', sql.NVarChar(45), telefono)
      .input('email', sql.NVarChar(45, email))
      .query(`
        EXEC dbo.InsertarProductos 
        @id, @razonSocial, @nombreComercial, @direccionEntrega, @telefono, @email
      `);
    res.status(201).send('Cliente creado exitosamente.');
  } catch (err) {
    console.error("Error al insertar cliente:", err);
    res.status(500).send("Error al insertar cliente.");
  }
};

// Modificar un cliente
const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { razonSocial, nombreComercial, direccionEntrega, telefono, email } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
    .input('id', sql.Int, id)
    .input('razonSocial', sql.NVarChar(245), razonSocial)
    .input('nombreComercial', sql.NVarChar(345), nombreComercial)
    .input('direccionEntrega', sql.NVarChar(45), direccionEntrega)
    .input('telefono', sql.NVarChar(45), telefono)
    .input('email', sql.NVarChar(45, email))
      .query(`
        EXEC dbo.ModificarCliente @id, @razonSocial, @nombreComercial, @direccionEntrega, @telefono, @email
      `);
    res.send('Cliente actualizado exitosamente.');
  } catch (err) {
    console.error("Error al actualizar cliente:", err);
    res.status(500).send("Error al actualizar cliente.");
  }
};

module.exports = {
  getAllClientes,
  insertCliente,
  updateCliente
};