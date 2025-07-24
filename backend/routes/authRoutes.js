const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  iniciarSesion,
  recuperarContraseña
} = require('../controllers/authController');

// Ruta: POST /api/registro
router.post('/registro', registrarUsuario);

// Ruta: POST /api/login
router.post('/login', iniciarSesion);

// Ruta: POST /api/recuperar
router.post('/recuperar', recuperarContraseña);

module.exports = router;
