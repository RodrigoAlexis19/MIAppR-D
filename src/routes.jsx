import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro';
import MenuCompartido from './pages/MenuCompartido';
import PerfilElla from './pages/PerfilElla';
import MiEspacio from './pages/MiEspacio';
import Finanzas from './pages/Finanzas';
import Tareas from './pages/Tareas';
import Recuperar from './pages/Recuperar';

function AppRoutes() {
  return (
    <Routes>
      {/* Redirección automática de "/" a "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pantallas funcionales */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/menu" element={<MenuCompartido />} />
      <Route path="/ella" element={<PerfilElla />} />
      <Route path="/miespacio" element={<MiEspacio />} />
      <Route path="/finanzas" element={<Finanzas />} />
      <Route path="/tareas" element={<Tareas />} />
      <Route path="/recuperar" element={<Recuperar />} />
    </Routes>
  );
}

export default AppRoutes;

