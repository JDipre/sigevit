const express = require('express')
const router = express.Router()
const sql = require('mssql')
const dbConfig = require('../config/db') // Asegúrate de que esta ruta exista y esté bien configurada

// ✅ CREAR NUEVO CASO
router.post('/', async (req, res) => {
  try {
    console.log('📥 Datos recibidos:', req.body)

    const {
      nombre, apellido, pseudonimo, sexo, nacionalidad,
      provincia, fechaRescate, lugarRescate, resumen
    } = req.body

    // Validación mínima
    if (!nombre || !apellido || !sexo || !fechaRescate) {
      return res.status(400).send('Faltan campos requeridos')
    }

    const pool = await sql.connect(dbConfig)
    await pool.request()
      .input('nombre', sql.VarChar(100), nombre)
      .input('apellido', sql.VarChar(100), apellido)
      .input('pseudonimo', sql.VarChar(100), pseudonimo)
      .input('sexo', sql.VarChar(20), sexo)
      .input('nacionalidad', sql.VarChar(100), nacionalidad)
      .input('provincia', sql.VarChar(100), provincia)
      .input('fechaRescate', sql.Date, fechaRescate)
      .input('lugarRescate', sql.VarChar(150), lugarRescate)
      .input('resumen', sql.VarChar(1000), resumen)
      .query(`
        INSERT INTO casos (
          nombre, apellido, pseudonimo, sexo, nacionalidad,
          provincia, fecha_rescate, lugar_rescate, resumen
        )
        VALUES (
          @nombre, @apellido, @pseudonimo, @sexo, @nacionalidad,
          @provincia, @fechaRescate, @lugarRescate, @resumen
        )
      `)

    res.status(200).json({ message: '✅ Caso insertado correctamente' })
  } catch (err) {
    console.error('❌ Error al insertar caso:', err)
    res.status(500).send('Error en el servidor')
  }
})

// ✅ OBTENER TODOS LOS CASOS
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig)
    const result = await pool.request().query('SELECT * FROM casos')
    res.status(200).json(result.recordset)
  } catch (err) {
    console.error('❌ Error al obtener casos:', err)
    res.status(500).send('Error en el servidor')
  }
})

// ✅ OBTENER CASO POR ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const pool = await sql.connect(dbConfig)
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM casos WHERE id = @id')

    if (result.recordset.length === 0) {
      return res.status(404).send('Caso no encontrado')
    }

    res.status(200).json(result.recordset[0])
  } catch (err) {
    console.error('❌ Error al obtener caso:', err)
    res.status(500).send('Error en el servidor')
  }
})

// ✅ EDITAR UN CASO EXISTENTE
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      nombre, apellido, pseudonimo, sexo, nacionalidad,
      provincia, fechaRescate, lugarRescate, resumen
    } = req.body

    const pool = await sql.connect(dbConfig)
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar(100), nombre)
      .input('apellido', sql.VarChar(100), apellido)
      .input('pseudonimo', sql.VarChar(100), pseudonimo)
      .input('sexo', sql.VarChar(20), sexo)
      .input('nacionalidad', sql.VarChar(100), nacionalidad)
      .input('provincia', sql.VarChar(100), provincia)
      .input('fechaRescate', sql.Date, fechaRescate)
      .input('lugarRescate', sql.VarChar(150), lugarRescate)
      .input('resumen', sql.VarChar(1000), resumen)
      .query(`
        UPDATE casos SET
          nombre = @nombre,
          apellido = @apellido,
          pseudonimo = @pseudonimo,
          sexo = @sexo,
          nacionalidad = @nacionalidad,
          provincia = @provincia,
          fecha_rescate = @fechaRescate,
          lugar_rescate = @lugarRescate,
          resumen = @resumen
        WHERE id = @id
      `)

    res.status(200).json({ message: '✅ Caso actualizado correctamente' })
  } catch (err) {
    console.error('❌ Error al actualizar caso:', err)
    res.status(500).send('Error en el servidor')
  }
})

module.exports = router
// Asegúrate de que este archivo esté correctamente importado y utilizado en tu archivo principal de servidor (por ejemplo, app.js o server.js)
