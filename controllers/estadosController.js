const { connectToDB, sql } = require('../config/db');

// Obtener todos los estados
const getAllEstados = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.Estados');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener estados:", err);
    res.status(500).send("Error al obtener estados.");
  }
};

// Insertar un nuevo producto
const insertEstados = async (req, res) => {
  const { id, nombre } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar(45), nombre)
      .query(`
        EXEC dbo.InsertarEstados
        @id, @nombre)
      `);
    res.status(201).send('Estado creado exitosamente.');
  } catch (err) {
    console.error("Error al insertar estado:", err);
    res.status(500).send("Error al insertar estado.");
  }
};

// Modificar un producto
const updateEstados = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar(45), nombre)
      .query(`
        EXEC dbo.ModificarEstado @id @nombre
      `);
    res.send('Estado actualizado exitosamente.');
  } catch (err) {
    console.error("Error al actualizar estado:", err);
    res.status(500).send("Error al actualizar estado.");
  }
};

module.exports = {
  getAllEstados,
  insertEstados,
  updateEstados
};