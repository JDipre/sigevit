const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const casosRoutes = require('./routes/casos');

app.use(cors());
app.use(express.json());

app.use('/api/casos', casosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
