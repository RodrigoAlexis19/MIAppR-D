import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setMensaje('❌ Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await fetch('https://miappr-d.onrender.com/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Registro exitoso, redirigiendo...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al registrar:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition duration-300 ${
        theme === 'dark'
          ? 'bg-[#0c111d] text-[#d1d5db]'
          : 'bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900'
      }`}
    >
      <div
        className={`p-8 rounded-xl shadow-xl w-full max-w-sm mx-4 backdrop-blur-lg ${
          theme === 'dark' ? 'bg-white/5' : 'bg-white/10'
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            theme === 'dark' ? 'text-[#e2b5ff]' : 'text-gray-900'
          }`}
        >
          Crear Cuenta
        </h2>

        <form className="space-y-4" onSubmit={handleRegistro}>
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

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 rounded-lg pr-10 ${
                theme === 'dark'
                  ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                  : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
              } focus:outline-none focus:ring-2`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/80 hover:text-white"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repetir contraseña"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg pr-10 ${
                theme === 'dark'
                  ? 'bg-white/20 text-white placeholder-white/70 focus:ring-[#67e8f9]'
                  : 'bg-white/20 text-white placeholder-white/70 focus:ring-[#22d3ee]'
              } focus:outline-none focus:ring-2`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/80 hover:text-white"
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

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
          <button
            onClick={() => navigate('/')}
            className={`hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-gray-900'
            }`}
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registro;

