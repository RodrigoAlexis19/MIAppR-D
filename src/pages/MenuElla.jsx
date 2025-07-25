import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import ClockDual from '../components/ClockDual'
import IconCard from '../components/IconCard'
import { Link } from 'react-router-dom'

function MenuElla() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition duration-300 ${
        theme === 'dark'
          ? 'bg-[#0c111d] text-[#d1d5db]'
          : 'bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900'
      }`}
    >
      {/* Ícono superior izquierdo (avatar de ella) */}
      <Link
        to="/ella"
        className="absolute top-4 left-4 rounded-full border-4 p-0.5"
        style={{
          borderColor: theme === 'dark' ? '#f9a8d4' : '#f9a8d4', // Rosado claro
        }}
      >
        <img
          src="/MIAppR-D/icons/espacio-de-ella.png"
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover"
        />
      </Link>

      {/* Botón de cambio de tema y salir */}
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={toggleTheme}
          className="text-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>

        <Link
          to="/"
          className="text-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md p-2 rounded-full hover:scale-110 transition"
          aria-label="Volver al login"
        >
          🚪
        </Link>
      </div>

      {/* Título principal */}
      <h1
        className={`text-3xl sm:text-4xl font-bold mb-6 ${
          theme === 'dark' ? 'text-[#e2b5ff]' : 'text-yellow-300'
        }`}
      >
        🌍 Menú Principal
      </h1>

      {/* Reloj Dual */}
      <ClockDual />

      {/* Íconos de navegación */}
      <div className="mt-10 flex gap-10 flex-wrap justify-center">
        <IconCard
          to="/finanzas"
          label="Finanzas"
          icon="/MIAppR-D/icons/finanzas.png"
          textColor={theme === 'dark' ? 'text-white' : ''}
        />
        <IconCard
          to="/tareas"
          label="Tareas"
          icon="/MIAppR-D/icons/tareas.png"
          textColor={theme === 'dark' ? 'text-white' : ''}
        />
        <IconCard
          to="/multimedia"
          label="Multimedia"
          icon="/MIAppR-D/icons/multimedia.png"
          textColor={theme === 'dark' ? 'text-white' : ''}
        />
        <IconCard
          to="/juegos"
          label="Zona de juego"
          icon="/MIAppR-D/icons/juegos.png"
          textColor={theme === 'dark' ? 'text-white' : ''}
        />
      </div>
    </div>
  )
}

export default MenuElla
