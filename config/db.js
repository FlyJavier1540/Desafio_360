const sql = require('mssql');

// Configuración de la base de datos SQL Server
const dbConfig = {
  user: 'sa',
  password: 'Alan0705',
  server: 'localhost',
  port: 1433,
  database: 'GDA00116-OT_alanalvarez',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const connectToDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado a SQL Server');
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
};

module.exports = { connectToDB, sql };
