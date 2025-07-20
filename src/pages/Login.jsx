import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';

function Login() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/menu');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'bg-[#0b141a]' : 'bg-gradient-to-br from-[#9b5de5] via-[#5ec8f6] to-[#00f5d4]'}`}>
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-3 py-1 text-sm rounded bg-white text-black dark:bg-gray-800 dark:text-white shadow-md hover:opacity-80"
      >
        {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <div className={`rounded-lg shadow-lg p-8 w-full max-w-md transition-all duration-500 ${theme === 'dark' ? 'bg-[#1f2a37] text-white' : 'bg-[#e6f7fa] text-black'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-3 mb-4 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-4 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-[#8338ec] text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Iniciar sesión
        </button>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-cyan-300 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
