const { connectToDB, sql } = require('../config/db');

// Insertar un nuevo detalle
const insertOrdenDetalle = async (req, res) => {
    const { id, idOrden, idProducto, cantidad, precio, subtotal } = req.body;
    try {
      const pool = await connectToDB();
      await pool.request()
        .input('id', sql.Int, id)
        .input('idOrden', sql.Int, idOrden)
        .input('idProducto', sql.Int, idProducto)
        .input('cantidad', sql.Int, cantidad)
        .input('precio', sql.Float, precio)
        .input('subtotal', sql.Float, subtotal)
        .query(`
          EXEC dbo.InsertarOrdenDetalle 
          @id, @idOrden, @idProducto, @cantidad, @precio, @subtotal
        `);
      res.status(201).send('Detalle de orden creado exitosamente.');
    } catch (err) {
      console.error("Error al insertar detalle de orden:", err);
      res.status(500).send("Error al insertar detalle de orden.");
    }
  };
  

// Modificar un detalle
const updateOrdenDetalle = async (req, res) => {
    const { id } = req.params;
    const { idOrden, idProducto, cantidad, precio, subtotal } = req.body;
    try {
      const pool = await connectToDB();
      await pool.request()
        .input('id', sql.Int, id)
        .input('idOrden', sql.Int, idOrden)
        .input('idProducto', sql.Int, idProducto)
        .input('cantidad', sql.Int, cantidad)
        .input('precio', sql.Float, precio)
        .input('subtotal', sql.Float, subtotal)
        .query(`
          EXEC dbo.ModificarOrdenDetalle 
          @id, @idOrden, @idProducto, @cantidad, @precio, @subtotal
        `);
      res.send('Detalle de orden actualizado exitosamente.');
    } catch (err) {
      console.error("Error al actualizar detalle de orden:", err);
      res.status(500).send("Error al actualizar detalle de orden.");
    }
  };
  

module.exports = {
  insertOrdenDetalle,
  updateOrdenDetalle
};