const express = require('express');
const router = express.Router();
const {
  register,
  login,
  recuperarContraseña
} = require('../controllers/authController');

// Registro de usuario
router.post('/registro', register);

// Inicio de sesión
router.post('/login', login);

// Recuperación de contraseña
router.post('/recuperar', recuperarContraseña);

module.exports = router;
