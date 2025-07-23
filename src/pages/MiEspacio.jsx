import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function MiEspacio() {
  const galeriaRef = useRef(null);
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    if (imagenes.length <= 3) return;

    const intervalo = setInterval(() => {
      if (galeriaRef.current) {
        galeriaRef.current.scrollLeft += 1;
        const maxScroll = galeriaRef.current.scrollWidth / 2;
        if (galeriaRef.current.scrollLeft >= maxScroll) {
          galeriaRef.current.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(intervalo);
  }, [imagenes]);

  const manejarCarga = (e) => {
    const archivos = Array.from(e.target.files);
    const nuevas = archivos.map((archivo) => URL.createObjectURL(archivo));
    setImagenes((prev) => [...prev, ...nuevas]);
  };

  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const renderGaleria = () => {
    const maximoFijo = 3;

    if (imagenes.length === 0 || imagenes.length <= maximoFijo) {
      const elementos = [];
      for (let i = 0; i < maximoFijo; i++) {
        if (imagenes[i]) {
          elementos.push(
            <div key={i} className="relative w-44 h-44 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden">
              <img src={imagenes[i]} alt={`img-${i}`} className="w-full h-full object-cover" />
              <button
                onClick={() => eliminarImagen(i)}
                className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded hover:bg-red-500"
              >
                ❌
              </button>
            </div>
          );
        } else {
          elementos.push(
            <label
              key={i}
              className="w-44 h-44 rounded-lg bg-white/10 text-white/50 text-5xl flex items-center justify-center cursor-pointer hover:bg-white/20"
            >
              +
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={manejarCarga}
                className="hidden"
              />
            </label>
          );
        }
      }
      return (
        <div
          className="absolute -top-8 w-[90%] flex justify-center gap-4 px-2 z-0 min-h-[11rem] opacity-80 blur-[0.5px] rounded-xl bg-[#0f172a]/30"
        >
          {elementos}
        </div>
      );
    }

    return (
      <div
        ref={galeriaRef}
        className="absolute -top-8 w-[90%] h-44 overflow-x-auto whitespace-nowrap flex gap-4 px-2 z-0 opacity-80 blur-[0.5px] rounded-xl bg-[#0f172a]/30 scrollbar-hide"
      >
        {imagenes.concat(imagenes).map((src, idx) => (
          <div key={idx} className="relative inline-block h-44 w-44 rounded-lg overflow-hidden flex-shrink-0">
            <img src={src} alt={`Recuerdo ${idx + 1}`} className="h-full w-full object-cover" />
            <button
              onClick={() => eliminarImagen(idx % imagenes.length)}
              className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded hover:bg-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] p-4 relative overflow-hidden">

      {/* Galería detrás del avatar */}
      <div className="relative w-full flex flex-col items-center mt-6">
        {renderGaleria()}

        {/* Avatar */}
        <div className="relative z-10 flex flex-col items-center pt-16">
          <img
            src="/MIAppR-D/icons/mi-espacio.png"
            alt="Avatar de Rodrigo"
            className="w-24 h-24 rounded-full shadow-lg border-4 border-[#38bdf8] object-cover"
          />
          <h2 className="mt-2 text-xl font-semibold text-cyan-300">Rodrigo Alexis</h2>
          <p className="text-sm text-cyan-300/80">Mi Espacio Personal</p>

          {/* Botón para añadir en modo carrusel */}
          {imagenes.length > 3 && (
            <div className="mt-2">
              <label className="text-sm text-cyan-300/80 underline cursor-pointer">
                Añadir a galería
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={manejarCarga}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Secciones */}
      <div className="w-full mt-8 space-y-4 z-10 relative">
        <div className="bg-white/5 rounded-xl p-4 shadow-md">
          <h3 className="text-cyan-300 font-bold mb-2">Ideas en desarrollo</h3>
          <p className="text-sm text-cyan-200/80">Espacio para guardar ideas técnicas, notas personales o conceptos clave.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 shadow-md">
          <h3 className="text-cyan-300 font-bold mb-2">Pruebas técnicas</h3>
          <p className="text-sm text-cyan-200/80">Se podrán registrar fragmentos de código o experimentos propios.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 shadow-md">
          <h3 className="text-cyan-300 font-bold mb-2">Metas y reflexiones</h3>
          <p className="text-sm text-cyan-200/80">Aquí se puede escribir sobre objetivos personales, progresos y autoevaluaciones.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 shadow-md">
          <h3 className="text-cyan-300 font-bold mb-2">Finanzas personales</h3>
          <p className="text-sm text-cyan-200/80">Control de gastos mensuales, ahorros y compras importantes fuera del viaje.</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 shadow-md">
          <h3 className="text-cyan-300 font-bold mb-2">Proyectos independientes</h3>
          <p className="text-sm text-cyan-200/80">Automatizaciones, scripts, proyectos técnicos personales o en curso.</p>
        </div>
      </div>

      {/* Chat */}
      <Link
        to="/chat"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#1e40af] shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition"
      >
        💬
      </Link>
    </div>
  );
}

export default MiEspacio;

