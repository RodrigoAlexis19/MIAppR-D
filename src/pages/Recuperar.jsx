import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

function Recuperar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://miappr-d.onrender.com/api/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setMensaje(data.mensaje);
    } catch (error) {
      console.error('Error al enviar recuperación:', error);
      setMensaje('❌ No se pudo procesar la solicitud. Intenta más tarde.');
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
        aria-label="Cambiar tema"
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>

      {/* Contenedor principal */}
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-sm mx-4 backdrop-blur-lg ${
        theme === 'dark' ? 'bg-white/5' : 'bg-white/10'
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          theme === 'dark' ? 'text-[#e2b5ff]' : 'text-gray-900'
        }`}>
          Recuperar Contraseña
        </h2>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            Enviar enlace
          </button>
        </form>

        {/* Mensaje */}
        {mensaje && (
          <p className="mt-4 text-center text-sm font-medium">{mensaje}</p>
        )}

        {/* Enlace para volver al login */}
        <div className="mt-4 text-center text-sm">
          <p>¿Ya recordaste tu contraseña?</p>
          <button
            onClick={() => navigate('/login')}
            className={`mt-2 inline-block hover:underline ${
              theme === 'dark' ? 'text-[#67e8f9]' : 'text-gray-900'
            }`}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recuperar;

