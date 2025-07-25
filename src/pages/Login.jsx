import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://miappr-d.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Inicio de sesión exitoso');

        const nombre = data.username?.toLowerCase().trim();
        const correo = data.email?.toLowerCase().trim();

        setTimeout(() => {
          if (nombre === 'rodrigoalexis' || correo === 'rodrigojara354@gmail.com') {
            navigate('/menu-rodrigo');
          } else if (nombre === 'ella' || correo === 'ella@gmail.com') {
            navigate('/menu-ella');
          } else {
            navigate('/menu');
          }
        }, 1500);
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative transition duration-300 ${
        theme === 'dark'
          ? 'bg-[#0c111d] text-[#d1d5db]'
          : 'bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900'
      }`}
    >
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

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
          Iniciar Sesión
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Correo o nombre de usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            Iniciar sesión
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium">{mensaje}</p>
        )}

        <div className="mt-4 text-center text-sm flex flex-col sm:flex-row sm:justify-center sm:gap-2 items-center">
          <button
            onClick={() => navigate('/recuperar')}
            className={`hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-gray-900'
            }`}
          >
            ¿Olvidaste tu contraseña?
          </button>
          <span className="hidden sm:inline">|</span>
          <button
            onClick={() => navigate('/registro')}
            className={`hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-gray-900'
            }`}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

