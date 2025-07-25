const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro de nuevo usuario
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const correo = email.toLowerCase();
    const usuario = username.toLowerCase();

    // Validar si ya existe ese correo o usuario
    const existeUsuario = await User.findOne({
      $or: [{ email: correo }, { username: usuario }]
    });

    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'Correo o nombre de usuario ya registrados' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = new User({
      username: usuario,
      email: correo,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor al registrar' });
  }
};

// Login con lógica personalizada
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Permitir login por email o username (ambos insensibles a mayúsculas)
    const criterio = email.includes('@')
      ? { email: email.toLowerCase() }
      : { username: email.toLowerCase() };

    const user = await User.findOne(criterio);

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Lógica de redirección automática
    const usuarios = await User.find().sort({ _id: 1 });
    let destino;

    if (user.username === 'rodrigoalexis' || user.email === 'rodrigojara354@gmail.com') {
      destino = 'MenuRodrigo';
    } else if (usuarios.length >= 2 && usuarios[1].email === user.email) {
      destino = 'MenuElla';
    } else {
      destino = 'MenuCompartido';
    }

    return res.status(200).json({
      mensaje: 'Login exitoso',
      username: user.username,
      email: user.email,
      destino
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Recuperar contraseña (versión inicial, por mejorar en el futuro)
const recuperarContraseña = async (req, res) => {
  try {
    const { email } = req.body;
    const correo = email.toLowerCase();

    const usuario = await User.findOne({ email: correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Correo no registrado' });
    }

    res.status(200).json({ mensaje: 'Solicitud recibida. Pronto te contactaremos.' });

  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// Exportar todas las funciones bien definidas
module.exports = {
  register,
  login,
  recuperarContraseña
};
