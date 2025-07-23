import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const res = await fetch('https://miappr-d.onrender.com/api/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('✅ Usuario registrado correctamente');
        // Redirigir al login después de unos segundos
        setTimeout(() => {
          navigate('/login');
        }, 1500);
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
      {/* Botón de tema */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 text-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      {/* Contenedor */}
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-sm mx-4 backdrop-blur-lg ${
        theme === 'dark' ? 'bg-white/5' : 'bg-white/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          theme === 'dark' ? 'text-[#e2b5ff]' : 'text-gray-900'
        }`}>
          Crear Cuenta
        </h2>

        {/* Formulario */}
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
            Registrarse
          </button>
        </form>

        {/* Mensaje de éxito o error */}
        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium">{mensaje}</p>
        )}

        {/* Enlace al login */}
        <div className="mt-4 text-center text-sm">
          <p>¿Ya tienes una cuenta?</p>
          <button
            onClick={() => navigate('/login')}
            className={`mt-2 inline-block hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-[#3bc8eb]'
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
