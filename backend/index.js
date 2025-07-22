const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectToDb = require('./db');
const casosRouter = require('./routes/casos');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Conexión de prueba
app.get('/api/test-db', async (req, res) => {
  try {
    const pool = await connectToDb();
    const result = await pool.request().query('SELECT TOP 1 * FROM sys.tables');
    res.status(200).json({
      message: 'Conexión exitosa',
      tables: result.recordset
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error al conectarse a la base de datos',
      error: err.message
    });
  }
});

// Conecta el router de casos
app.use('/api/casos', casosRouter);

// Servir carpeta de recursos
const carpetaRecursos = path.join('C:/Repositorios/sigevit/Formularios y Recursos');
app.use('/recursos', express.static(carpetaRecursos));

// Endpoint para listar archivos
app.get('/recursos', (req, res) => {
  fs.readdir(carpetaRecursos, (err, files) => {
    if (err) {
      console.error('Error leyendo la carpeta:', err);
      return res.status(500).json({ error: 'No se pudo leer la carpeta' });
    }

    const archivosPermitidos = files.filter(file =>
      (file.toLowerCase().endsWith('.pdf') || file.toLowerCase().endsWith('.docx') || file.toLowerCase().endsWith('.doc')) &&
      !file.startsWith('~$') // excluir temporales de Word
    );

    res.json(archivosPermitidos);
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor SIGEVIT activo 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
