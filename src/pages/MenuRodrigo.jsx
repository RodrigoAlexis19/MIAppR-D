import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import ClockDual from '../components/ClockDual'
import IconCard from '../components/IconCard'
import ChatFlotante from '../components/ChatFlotante'
import { Link, useNavigate } from 'react-router-dom'

function MenuRodrigo() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const [mostrarChat, setMostrarChat] = useState(false)

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 relative transition duration-300 ${
        theme === 'dark'
          ? 'bg-[#0c111d] text-[#d1d5db]'
          : 'bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900'
      }`}
    >
      {/* Ícono perfil arriba izquierda */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/miespacio')}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2"
          style={{ borderColor: '#38bdf8' }}
        >
          <img
            src="/MIAppR-D/icons/mi-espacio.png"
            alt="Perfil"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>

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
          textColor={theme === 'dark' ? '#e2b5ff' : ''}
        />
        <IconCard
          to="/tareas"
          label="Tareas"
          icon="/MIAppR-D/icons/tareas.png"
          textColor={theme === 'dark' ? '#e2b5ff' : ''}
        />
        <IconCard
          to="/multimedia"
          label="Multimedia"
          icon="/MIAppR-D/icons/multimedia.png"
          textColor={theme === 'dark' ? '#e2b5ff' : ''}
        />
        <IconCard
          to="/juegos"
          label="Zona de juego"
          icon="/MIAppR-D/icons/juegos.png"
          imgStyle="scale-[1.55]"
          textColor={theme === 'dark' ? '#e2b5ff' : ''}
        />
      </div>

      {/* Chat Flotante */}
      <button
        onClick={() => setMostrarChat(!mostrarChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#1e40af] shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition"
      >
        💬
      </button>

      {mostrarChat && <ChatFlotante onClose={() => setMostrarChat(false)} />}
    </div>
  )
}

export default MenuRodrigo;


