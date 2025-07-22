const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Soporte12',
  server: 'localhost',
  port: 1433,
  database: 'sigevit',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Conexión global para reutilizar
let pool;

const connectToDb = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('Conectado a la base de datos SQL Server');
    }
    return pool;
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
};

module.exports = connectToDb;
