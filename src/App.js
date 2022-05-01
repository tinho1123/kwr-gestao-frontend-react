import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Financeiro from './pages/GestaoDePedidos/Financeiro/Financeiro'
import Configuracoes from './pages/GestaoDePedidos/Configuracoes/Configuracoes'
import Fiados from './pages/GestaoDePedidos/Fiados/Fiados'
import Login from './pages/Login/Login'
import FiadosUser from './pages/GestaoDePedidos/Fiados/FiadoUser/FiadoUser'
import CreateFiador from './pages/GestaoDePedidos/Fiados/createFiador/CreateFiador'
import Navbar from './components/Navbar/Navbar';


export default function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} exact/>

        <Route path='/gestao-de-pedidos' element={
        <>
        <Navbar />
        <Financeiro />
        </>} exact 
        />

        <Route path='/gestao-de-pedidos/fiados' element={
        <>
        <Navbar />
        <Fiados />
        </>} exact
        />

        <Route path='/gestao-de-pedidos/fiados/createfiador' element={
        <>
        <Navbar />
        <CreateFiador />
        </>} exact 
        />

        <Route path='/gestao-de-pedidos/fiados/:id' element={
        <>
        <Navbar />
        <FiadosUser />
        </>} exact
        />

        <Route path='/gestao-de-pedidos/configuracoes' element={
        <>
        <Navbar />
        <Configuracoes />
        </>} exact 
        />
        
      </Routes>
    </Router>
  )
}
