import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const contraseñaEsSegura = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(pwd);
  };

  const [validacion, setValidacion] = useState({
    longitud: false,
    mayuscula: false,
    minuscula: false,
    numero: false,
    simbolo: false
  });

  const validarContraseñaEnTiempoReal = (pwd) => {
    setValidacion({
      longitud: pwd.length >= 8,
      mayuscula: /[A-Z]/.test(pwd),
      minuscula: /[a-z]/.test(pwd),
      numero: /[0-9]/.test(pwd),
      simbolo: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validarContraseñaEnTiempoReal(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== repeatEmail) {
      setMensaje('❌ Los correos no coinciden');
      return;
    }
    if (password !== repeatPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }
    if (!contraseñaEsSegura(password)) {
      setMensaje('❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo');
      return;
    }

    try {
      const res = await fetch('https://miappr-d.onrender.com/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Usuario registrado correctamente');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMensaje('❌ Error al registrar. Intenta más tarde.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative transition duration-300 ${
      theme === 'dark'
        ? 'bg-[#0c111d] text-[#d1d5db]'
        : 'bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900'
    }`}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      <div className={`p-8 rounded-xl shadow-xl w-full max-w-sm mx-4 backdrop-blur-lg ${
        theme === 'dark' ? 'bg-white/5' : 'bg-white/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          theme === 'dark' ? 'text-[#e2b5ff]' : 'text-gray-900'
        }`}>
          Crear Cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
            } focus:outline-none focus:ring-2`}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
            } focus:outline-none focus:ring-2`}
          />
          <input
            type="email"
            placeholder="Repetir correo"
            value={repeatEmail}
            onChange={(e) => setRepeatEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
            } focus:outline-none focus:ring-2`}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
            } focus:outline-none focus:ring-2`}
          />
          <ul className="text-xs space-y-1 pl-2">
            <li className={validacion.longitud ? 'text-green-400' : 'text-red-400'}>• Mínimo 8 caracteres</li>
            <li className={validacion.mayuscula ? 'text-green-400' : 'text-red-400'}>• Al menos una mayúscula</li>
            <li className={validacion.minuscula ? 'text-green-400' : 'text-red-400'}>• Al menos una minúscula</li>
            <li className={validacion.numero ? 'text-green-400' : 'text-red-400'}>• Al menos un número</li>
            <li className={validacion.simbolo ? 'text-green-400' : 'text-red-400'}>• Al menos un símbolo</li>
          </ul>
          <input
            type="password"
            placeholder="Repetir contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
            } focus:outline-none focus:ring-2`}
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold transition hover:scale-105 shadow-md bg-gradient-to-r from-[#3b82f6] to-[#22d3ee] text-white"
            style={{ filter: 'contrast(1.2) brightness(1.1)' }}
          >
            Registrarse
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium">{mensaje}</p>
        )}

        <div className="mt-4 text-center text-sm">
          <p>¿Ya tienes una cuenta?</p>
          <button
            onClick={() => navigate('/login')}
            className={`mt-2 inline-block hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-gray-900'
            }`}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registro;

