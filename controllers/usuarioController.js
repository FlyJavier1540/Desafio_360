const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToDB, sql } = require('../config/db');
const secretKey = process.SECRET_KEY;


const getAllUsuarios = async (req, res) => {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM dbo.usuario');
    res.json(result.recordset);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).send("Error al obtener usuarios.");
  }
};

const insertUsuarios = async (req, res) => {
  const { id, rolId, estadosId, correo, nombre, password, telefono, fechaNacimiento, clientesId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('rolId', sql.Int, rolId)
      .input('estadosId', sql.Int, estadosId)
      .input('correo', sql.NVarChar(45), correo)
      .input('nombre', sql.NVarChar(245), nombre)
      .input('password', sql.NVarChar(60), hashedPassword)
      .input('telefono', sql.NVarChar(45), telefono)
      .input('fechaNacimiento', sql.Date, fechaNacimiento)
      .input('clientesId', sql.Int, clientesId)
      .query(`
        INSERT INTO dbo.usuario (idusuarios, rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idClientes)
        VALUES (@id, @rolId, @estadosId, @correo, @nombre, @password, @telefono, @fechaNacimiento, GETDATE(), @clientesId)
      `);
    res.status(201).send('Usuario creado exitosamente.');
  } catch (err) {
    console.error("Error al insertar usuario:", err);
    res.status(500).send("Error al insertar usuario.");
  }
};

const updateUsuarios = async (req, res) => {
  const { id } = req.params;
  const { rolId, estadosId, correo, nombre, password, telefono, fechaNacimiento, clientesId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('id', sql.Int, id)
      .input('rolId', sql.Int, rolId)
      .input('estadosId', sql.Int, estadosId)
      .input('correo', sql.NVarChar(45), correo)
      .input('nombre', sql.NVarChar(245), nombre)
      .input('password', sql.NVarChar(60), hashedPassword)
      .input('telefono', sql.NVarChar(45), telefono)
      .input('fechaNacimiento', sql.Date, fechaNacimiento)
      .input('clientesId', sql.Int, clientesId)
      .query(`
        UPDATE dbo.usuario 
        SET rol_idrol = @rolId, estados_idestados = @estadosId, correo_electronico = @correo, nombre_completo = @nombre, password = @password, telefono = @telefono, fecha_nacimiento = @fechaNacimiento, Clientes_idClientes = @clientesId 
        WHERE idusuarios = @id
      `);
    res.send('Usuario actualizado exitosamente.');
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(500).send("Error al actualizar usuario.");
  }
};

const login = async (req, res) => {
  const { correo, password } = req.body;
  
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('correo', sql.NVarChar(45), correo)
      .query('SELECT * FROM dbo.usuario WHERE correo_electronico = @correo');
    
    if (result.recordset.length === 0) {
      return res.status(401).send('Correo o contraseña incorrectos.');
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Correo o contraseña incorrectos.');
    }

    const token = jwt.sign({ id: user.idusuarios, rolId: user.rol_idrol }, secretKey, { expiresIn: '24h' });

    res.json({ token });
  } catch (err) {
    console.error("Error en la autenticación:", err);
    res.status(500).send("Error en la autenticación.");
  }
};

module.exports = {
  getAllUsuarios,
  insertUsuarios,
  updateUsuarios,
  login
};


