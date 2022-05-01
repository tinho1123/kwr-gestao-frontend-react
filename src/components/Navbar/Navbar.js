import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Sidebar() {
  return (
    <nav className='navbar'>
      <div className='user'>
          <div>
            <img src='https://img.freepik.com/fotos-gratis/imagem-aproximada-em-tons-de-cinza-de-uma-aguia-careca-americana-em-um-fundo-escuro_181624-31795.jpg?w=2000' alt='foto_perfil'/>
          </div>
          <div>
            <p>Seja bem vindo, Depósito KWR!</p>
          </div>
      </div>
      <div >
        <ul className='list_link'>
          <NavLink to='/gestao-de-pedidos' className='navlink' >Home</NavLink>
          <NavLink to='/gestao-de-pedidos/fiados' className='navlink' >Fiados</NavLink>
          <NavLink to='/gestao-de-pedidos/configuracoes' className='navlink' >Configurações</NavLink>
        </ul>
      </div>
    </nav>
  )
}
