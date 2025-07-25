const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de usuario
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailExistente = await User.findOne({ email });
    const usernameExistente = await User.findOne({ username });

    if (emailExistente || usernameExistente) {
      return res.status(400).json({
        mensaje: 'El correo o nombre de usuario ya está registrado'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({
      username,
      email: email.toLowerCase().trim(),
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: email.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Login exitoso',
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Recuperación de contraseña
const recuperarContraseña = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: 'Debes ingresar un correo electrónico' });
  }

  try {
    const usuario = await User.findOne({ email: email.toLowerCase().trim() });

    if (!usuario) {
      return res.status(200).json({ mensaje: '📧 Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.' });
    }

    // Aquí puedes conectar a tu servicio de correo real
    console.log(`Simulando recuperación de contraseña para: ${email}`);

    return res.status(200).json({
      mensaje: '📧 Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.'
    });

  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor en recuperación de contraseña' });
  }
};

module.exports = {
  register,
  login,
  recuperarContraseña
};



