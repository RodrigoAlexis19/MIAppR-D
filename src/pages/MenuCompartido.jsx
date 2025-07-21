import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import ClockDual from '../components/ClockDual'
import IconCard from '../components/IconCard'

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
      {/* Botón de cambio de tema y volver */}
      <div className="absolute top-4 right-4 flex gap-4">
        <button
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 flex items-center justify-center bg-white/30 dark:bg-white/10 shadow-md hover:scale-110 active:scale-95 transition"
        >
          🌗
        </button>
        <a
          href="/"
          className="rounded-full w-10 h-10 flex items-center justify-center bg-white/30 dark:bg-white/10 shadow-md hover:scale-110 active:scale-95 transition"
        >
          ⬅
        </a>
      </div>

      {/* Título principal */}
      <h1 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6">
        🌍 Menú Principal
      </h1>

      {/* Reloj Dual */}
      <ClockDual />

      {/* Íconos de navegación */}
      <div className="mt-10 flex gap-10 flex-wrap justify-center">
        <IconCard
          to="/ella"
          label="Didi"
          icon="/MIAppR-D/icons/espacio-de-ella.png"
        />

        <IconCard
          to="/miespacio"
          label="Rodrigo Alexis"
          icon="/MIAppR-D/icons/mi-espacio.png"
        />

        <IconCard
          to="/finanzas"
          label="Finanzas"
          icon="/MIAppR-D/icons/finanzas.png"
        />

        <IconCard
          to="/tareas"
          label="Tareas"
          icon="/MIAppR-D/icons/tareas.png"
        />
      </div>
    </div>
  )
}

export default MenuCompartido

