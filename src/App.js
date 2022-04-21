import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Financeiro from './pages/GestaoDePedidos/Financeiro/Financeiro'
import Configuracoes from './pages/GestaoDePedidos/Configuracoes/Configuracoes'
import Fiados from './pages/GestaoDePedidos/Fiados/Fiados'
import Login from './pages/Login/Login'
import FiadosUser from './pages/GestaoDePedidos/Fiados/FiadoUser/FiadoUser'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/gestao-de-pedidos' element={<Financeiro />} exact />
        <Route path='/gestao-de-pedidos/fiados' element={<Fiados />} />
        <Route path='/gestao-de-pedidos/fiados/:id' element={ <FiadosUser /> } />
        <Route path='/gestao-de-pedidos/configuracoes' element={<Configuracoes />} />
        
      </Routes>
    </Router>
  )
}
