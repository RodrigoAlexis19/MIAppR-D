const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Registro y recuperación siguen igual (no se tocan)

// Login actualizado con lógica automática
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por correo o por username (insensible a mayúsculas)
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

    // Obtener cuántos usuarios hay en la base de datos
    const totalUsuarios = await User.countDocuments();

    let destino;

    if (user.username === 'Rodrigo' || user.email === 'rodrigo@gmail.com') {
      destino = 'MenuRodrigo';
    } else {
      // Ver si es el segundo usuario registrado (para ella)
      const usuarios = await User.find().sort({ _id: 1 }); // orden por creación
      if (usuarios.length >= 2 && usuarios[1].email === user.email) {
        destino = 'MenuElla';
      } else {
        destino = 'MenuCompartido';
      }
    }

    return res.status(200).json({
      mensaje: 'Login exitoso',
      username: user.username,
      email: user.email,
      destino // esto te servirá en frontend para redirigir
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = {
  register,
  login,
  recuperarContraseña
};



