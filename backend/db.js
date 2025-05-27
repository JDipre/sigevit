const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER.split('\\\\')[0], // JMDPDT01
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    instanceName: 'SQLEXPRESS'
  }
};


module.exports = {
  sql,
  config
};
