const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validación de existencia previa
    const emailExistente = await User.findOne({ email });
    const usernameExistente = await User.findOne({ username });

    if (emailExistente || usernameExistente) {
      return res.status(400).json({
        mensaje: 'El correo o nombre de usuario ya está registrado'
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      username,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar por correo o nombre de usuario (ignorando mayúsculas)
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

    // 🔄 Se devuelve también el username y el email
    return res.status(200).json({
      mensaje: 'Login exitoso',
      username: user.username,
      email: user.email
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { register, login };


