import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ClockDual from '../components/ClockDual'
import { ThemeContext } from '../context/ThemeContext'

function MenuCompartido() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition duration-300 ${
        theme === 'dark'
          ? 'bg-[#0b141a] text-white'
          : 'bg-gradient-to-r from-[#A18CD1] to-[#3FB8D4] text-gray-900'
      }`}
    >
      {/* Botón de cambio de tema */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-white px-3 py-1 rounded shadow"
        >
          Cambiar modo
        </button>
      </div>

      {/* Título principal */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#fbe84d] mb-6">🌍 Menú Principal</h1>

      {/* Reloj Dual */}
      <ClockDual />

      {/* Íconos de navegación */}
      <div className="mt-10 flex gap-10 flex-wrap justify-center">
        <Link to="/ella" className="group flex flex-col items-center">
          <img
            src="/icons/espacio-de-ella.png"
            alt="Espacio de ella"
            className="w-14 h-14 hover:scale-110 transition"
          />
          <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition">
            Espacio de ella
          </span>
        </Link>

        <Link to="/miespacio" className="group flex flex-col items-center">
          <img
            src="/icons/mi-espacio.png"
            alt="Tu espacio"
            className="w-14 h-14 hover:scale-110 transition"
          />
          <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition">
            Tu espacio
          </span>
        </Link>

        <Link to="/finanzas" className="group flex flex-col items-center">
          <img
            src="/icons/finanzas.png"
            alt="Finanzas"
            className="w-14 h-14 hover:scale-110 transition"
          />
          <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition">
            Finanzas
          </span>
        </Link>

        <Link to="/tareas" className="group flex flex-col items-center">
          <img
            src="/icons/tareas.png"
            alt="Tareas"
            className="w-14 h-14 hover:scale-110 transition"
          />
          <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition">
            Tareas
          </span>
        </Link>
      </div>
    </div>
  )
}

export default MenuCompartido
