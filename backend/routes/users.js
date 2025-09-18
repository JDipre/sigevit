const express = require('express');
const router = express.Router();
const sql = require('mssql');
const connectToDb = require('../db');
const bcrypt = require('bcrypt'); // para encriptar contraseña

// 🔹 REGISTRAR NUEVO USUARIO
router.post('/register', async (req, res) => {
    const { name, email, password, role, status } = req.body;

    if (!name || !email || !password || !role || !status) {
        return res.status(400).send('Faltan campos requeridos');
    }

    try {
        const pool = await connectToDb();

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('Name', sql.VarChar(100), name)
            .input('Email', sql.VarChar(100), email)
            .input('Role', sql.VarChar(50), role)
            .input('Status', sql.VarChar(50), status)
            .input('Password', sql.VarChar(50), hashedPassword)
            .query(`
        INSERT INTO users (Name, Email, Role, Status, Password)
        VALUES (@Name, @Email, @Role, @Status, @Password)
      `);

        res.status(200).json({ message: '✅ Usuario registrado correctamente' });
    } catch (err) {
        console.error('❌ Error al registrar usuario:', err);
        res.status(500).send('Error en el servidor');
    }
});

// 🔹 LOGIN
router.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).send('Faltan campos requeridos');
    }

    try {
        const pool = await connectToDb();

        const result = await pool.request()
            .input('Email', sql.VarChar(100), correo)
            .query('SELECT * FROM users WHERE correo = @correo');

        if (result.recordset.length === 0) {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }

        const user = result.recordset[0];

        // comparar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }

        // Aquí puedes generar un JWT o devolver un token
        res.status(200).json({ message: '✅ Login exitoso', userId: user.UsuarioID });
    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).send('Error en el servidor');
    }
});

// 🔹 OBTENER TODOS LOS USUARIOS
router.get('/', async (req, res) => {
    try {
        const pool = await connectToDb();
        const result = await pool.request().query('SELECT * FROM users');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('❌ Error al obtener usuarios:', err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
