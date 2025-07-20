import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import MenuCompartido from './pages/MenuCompartido'
import PerfilElla from './pages/PerfilElla'
import MiEspacio from './pages/MiEspacio'
import Finanzas from './pages/Finanzas'
import Tareas from './pages/Tareas'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<MenuCompartido />} />
      <Route path="/ella" element={<PerfilElla />} />
      <Route path="/miespacio" element={<MiEspacio />} />
      <Route path="/finanzas" element={<Finanzas />} />
      <Route path="/tareas" element={<Tareas />} />
    </Routes>
  )
}

export default AppRoutes
