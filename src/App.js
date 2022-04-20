import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContentCentral from './pages/GestaoDePedidos/Financeiro/Financeiro'
import Login from './pages/Login/Login'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/gestao-de-pedidos' element={<ContentCentral />} />
        <Route path='/gestao-de-pedidos/fiados' element={<ContentCentral />} />
        <Route path='/gestao-de-pedidos/configuracoes' element={<ContentCentral />} />
        
      </Routes>
    </Router>
  )
}
