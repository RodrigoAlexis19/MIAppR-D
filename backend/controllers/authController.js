const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controlador para registrar nuevo usuario
const registrarUsuario = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Hashear la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      username,
      email,
      password: hashedPassword,
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para iniciar sesión con usuario o correo
const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Detectar si es correo o username
    const criterio = email.includes('@')
      ? { email: email.toLowerCase() }
      : { username: email };

    const usuario = await User.findOne(criterio);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar la contraseña ingresada con la hasheada
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};
