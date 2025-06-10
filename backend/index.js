const express = require('express');
const app = express();
const path = require('path');

// Habilitar CORS si es necesario
const cors = require('cors');
app.use(cors());

// Hacer pública la carpeta "recursos"
app.use('/recursos', express.static(path.join(__dirname, 'recursos')));

// Resto de tus rutas o lógica...
app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001');
});
