import React from 'react'
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className='sideBar'>
      <h3>Seja bem vindo</h3>
      <ul>
      <NavLink to='/gestao-de-pedidos' style={({'text-decoration': 'none'})}>
          <div className='li-block'>
            <p>Financeiro</p>
        </div>
        </NavLink>
        <NavLink to='/gestao-de-pedidos/fiados' style={({'text-decoration': 'none'})}>
          <div className='li-block'>
            <p>Fiados</p>
        </div>
        </NavLink>
        <NavLink to='/gestao-de-pedidos/configuracoes' style={({'text-decoration': 'none'})}>
          <div className='li-block'>
            <p>Configurações</p>
        </div>
        </NavLink>
      </ul>
    </div>
  )
}
