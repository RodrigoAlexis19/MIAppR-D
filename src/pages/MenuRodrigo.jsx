import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function MenuRodrigo() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fondo = theme === "dark" ? "bg-[#0b141a] text-white" : "bg-gradient-to-br from-[#7a32ff] to-[#3bc8eb] text-gray-900";

  const secciones = [
    { nombre: "Finanzas", icono: "/icons/finanzas.png", ruta: "/finanzas" },
    { nombre: "Tareas", icono: "/icons/tareas.png", ruta: "/tareas" },
    { nombre: "Multimedia", icono: "/icons/multimedia.png", ruta: "/multimedia" },
    { nombre: "Zona de juego", icono: "/icons/juegos.png", ruta: "/juegos" },
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition duration-300 ${fondo}`}>
      <div className="absolute top-4 left-4">
        <img
          src="/icons/mi-espacio.png"
          alt="Perfil Rodrigo"
          className="h-12 w-12 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
          onClick={() => navigate("/miespacio")}
        />
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center text-purple-300">🌐 Menú Principal</h1>
      <div className="flex gap-4 text-sm text-cyan-200 mb-10">
        <p>CL 09:36 p. m.</p>
        <p>VE 09:36 p. m.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {secciones.map((sec) => (
          <div
            key={sec.nombre}
            onClick={() => navigate(sec.ruta)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
          >
            <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center shadow-md">
              <img src={sec.icono} alt={sec.nombre} className="w-16 h-16 object-contain" />
            </div>
            <span className="mt-2 text-sm font-medium text-center dark:text-white text-black">
              {sec.nombre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuRodrigo;
