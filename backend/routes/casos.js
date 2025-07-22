const express = require('express');
const router = express.Router();
const sql = require('mssql');
const connectToDb = require('../db');


// 🔹 CREAR NUEVO CASO
router.post('/', async (req, res) => {
  const {
    nombre,
    apellido,
    seudonimo,
    sexo,
    nacionalidad,
    provincia,
    fechaRescate,
    lugarRescate,
    resumen,
    edad
  } = req.body;

  // Validación mínima
  if (!nombre || !apellido || !sexo || !fechaRescate) {
    return res.status(400).send('Faltan campos requeridos');
  }

  try {
    const pool = await connectToDb();
await pool.request()
  .input('nombre', sql.VarChar(100), nombre)
  .input('apellido', sql.VarChar(100), apellido)
  .input('seudonimo', sql.VarChar(100), seudonimo)
  .input('sexo', sql.VarChar(20), sexo)
  .input('nacionalidad', sql.VarChar(100), nacionalidad)
  .input('provincia', sql.VarChar(100), provincia)
  .input('fechaRescate', sql.Date, fechaRescate)
  .input('lugarRescate', sql.VarChar(150), lugarRescate)
  .input('resumen', sql.VarChar(1000), resumen)
  .input('edad', sql.Int, edad)
  .query(`
    INSERT INTO casos (
      nombre, apellido, seudonimo, sexo, nacionalidad,
      provincia, fechaRescate, lugarRescate, resumen
    )
    VALUES (
      @nombre, @apellido, @seudonimo, @sexo, @nacionalidad,
      @provincia, @fechaRescate, @lugarRescate, @resumen, @edad
    )
  `)


    res.status(200).json({ message: '✅ Caso insertado correctamente' });
  } catch (err) {
    console.error('❌ Error al insertar caso:', err);
    res.status(500).send('Error en el servidor');
  }
});

// 🔹 OBTENER TODOS LOS CASOS
router.get('/', async (req, res) => {
  try {
    const pool = await connectToDb();
    const result = await pool.request().query('SELECT * FROM casos');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('❌ Error al obtener los casos:', err);
    res.status(500).send('Error en el servidor');
  }
});

// 🔹 OBTENER CASO POR ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDb();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM casos WHERE CasoID = @id');

    if (result.recordset.length === 0) {
      return res.status(404).send('Caso no encontrado');
    }

    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('❌ Error al obtener caso:', err);
    res.status(500).send('Error en el servidor');
  }
});

// 🔹 ACTUALIZAR CASO POR ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    seudonimo,
    sexo,
    nacionalidad,
    provincia,
    fechaRescate,
    lugarRescate,
    resumen,
    edad
  } = req.body;

  try {
    const pool = await connectToDb();
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar(100), nombre)
      .input('apellido', sql.VarChar(100), apellido)
      .input('seudonimo', sql.VarChar(100), seudonimo)
      .input('sexo', sql.VarChar(20), sexo)
      .input('nacionalidad', sql.VarChar(100), nacionalidad)
      .input('provincia', sql.VarChar(100), provincia)
      .input('fechaRescate', sql.Date, fechaRescate)
      .input('lugarRescate', sql.VarChar(150), lugarRescate)
      .input('resumen', sql.VarChar(1000), resumen)
      .input('edad', sql.Int, edad)
      .query(`
        UPDATE casos SET
          nombre = @nombre,
          apellido = @apellido,
          seudonimo = @seudonimo,
          sexo = @sexo,
          nacionalidad = @nacionalidad,
          provincia = @provincia,
          fechaRescate = @fechaRescate,
          lugarRescate = @lugarRescate,
          resumen = @resumen,
          edad = @edad
        WHERE CasoID = @id
      `);

    res.status(200).json({ message: '✅ Caso actualizado correctamente' });
  } catch (err) {
    console.error('❌ Error al actualizar caso:', err);
    res.status(500).send('Error en el servidor');
  }
});

// 🔹 ELIMINAR CASO POR ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await connectToDb();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM casos WHERE CasoID = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send('Caso no encontrado');
    }

    res.status(200).json({ message: '✅ Caso eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar caso:', err);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
