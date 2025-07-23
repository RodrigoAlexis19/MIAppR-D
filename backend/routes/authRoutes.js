const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/authController');

// Ruta: POST /api/registro
router.post('/registro', registrarUsuario);

// Ruta: POST /api/login
router.post('/login', iniciarSesion);

module.exports = router;