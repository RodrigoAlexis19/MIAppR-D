import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { IoClose, IoSend, IoMic, IoAttach, IoCamera, IoCall } from 'react-icons/io5'

const ChatFlotante = () => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'ella', text: '¡Hola amor!' },
    { from: 'yo', text: '¡Hola! ¿Cómo estás?' },
    { from: 'ella', text: 'Muy bien, avanzando con el diseño 💜' },
    { from: 'yo', text: 'Qué bueno mi amor 🥰' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSend = () => {
    if (newMessage.trim() === '') return
    setMessages([...messages, { from: 'yo', text: newMessage }])
    setNewMessage('')
  }

  return (
    <>
      {/* Botón flotante de apertura */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#1e40af] shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition"
          aria-label="Abrir chat"
        >
          💬
        </button>
      )}

      {/* Ventana flotante de chat */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-80 h-[480px] sm:w-96 rounded-2xl overflow-hidden shadow-xl flex flex-col border border-white/10 transition z-50 ${
            isDark
              ? 'bg-gradient-to-t from-[#0f172a] to-[#000000] text-white'
              : 'bg-white text-gray-800'
          }`}
        >
          {/* Encabezado */}
          <div
            className={`flex items-center justify-between px-4 py-2 font-semibold ${
              isDark ? 'bg-[#43196d] text-white' : 'bg-[#d1c4e9] text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src="/icons/logo-didi1.PNG"
                alt="Avatar"
                className="w-6 h-6 rounded-full"
              />
              <span>Didi</span>
            </div>
            <IoCall className="text-xl cursor-pointer mr-2" />
            <button onClick={toggleChat}>
              <IoClose size={20} />
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 flex flex-col">
            {messages.map((msg, index) => {
              const isMine = msg.from === 'yo'
              const bgColor = isMine
                ? isDark
                  ? 'linear-gradient(to top, #1e40af, #3b82f6)'
                  : 'linear-gradient(to top, #60a5fa, #93c5fd)'
                : isDark
                  ? '#2f2f2f'
                  : '#e5e7eb'
              const textColor = isMine
                ? 'text-white'
                : isDark
                  ? 'text-white'
                  : 'text-gray-900'

              return (
                <div
                  key={index}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-2 rounded-xl ${textColor}`}
                    style={{
                      background: bgColor
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Entrada de mensaje */}
          <div className={`flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-[#1c1c1c]' : 'bg-gray-100'}`}>
            <IoMic className="text-xl cursor-pointer" />
            <IoAttach className="text-xl cursor-pointer" />
            <IoCamera className="text-xl cursor-pointer" />
            <input
              type="text"
              placeholder="Escribe algo..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className={`flex-1 p-2 rounded-full outline-none text-sm ${
                isDark ? 'bg-[#2c2c2c] text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
              }`}
            />
            <button onClick={handleSend}>
              <IoSend className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatFlotante

