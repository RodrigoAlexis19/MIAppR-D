const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Validar contraseña segura
const esContraseñaSegura = (pwd) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(pwd);
};

// Validar formato de correo electrónico
const esCorreoValido = (correo) => {
  const regex = /^[\w-.]+@gmail\.com$/i;
  return regex.test(correo);
};

// Controlador para registrar nuevo usuario
const registrarUsuario = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    if (!email || !esCorreoValido(email.trim())) {
      return res.status(400).json({ mensaje: 'Solo se permiten correos válidos de gmail.com' });
    }

    email = email.toLowerCase().trim();

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Validar contraseña fuerte
    if (!esContraseñaSegura(password)) {
      return res.status(400).json({ mensaje: 'Contraseña insegura. Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.' });
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
    const criterio = email.includes('@')
      ? { email: email.toLowerCase() }
      : { username: email };

    const usuario = await User.findOne(criterio);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

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

// Controlador para recuperación de contraseña
const recuperarContraseña = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'Debes ingresar un correo electrónico' });
  }

  try {
    const usuario = await User.findOne({ email: email.toLowerCase().trim() });

    // Siempre respondemos igual para evitar revelar si el usuario existe o no
    if (!usuario) {
      return res.status(200).json({ mensaje: '📧 Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.' });
    }

    // Aquí podrías generar y guardar un token de recuperación temporal
    console.log(`Simulando recuperación para ${email}`);

    res.status(200).json({ mensaje: '📧 Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.' });
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor en recuperación de contraseña' });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  recuperarContraseña
};

