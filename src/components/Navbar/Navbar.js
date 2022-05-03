import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Sidebar() { 
  const [isActive, setIsActive] = useState(false);
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
      { window.screen.width < 600 ? (
        <>
        <div>
          <button onClick={() => setIsActive(!isActive)}
          style={{ width: 40, marginTop: 5,height: 40, borderRadius: 50, display: 'flex', justifyContent:'center' }}
          >
            <img 
            src='http://dce.rocketausgate.com/_images/menu-icon.png'
            alt="hamburguer menu" 
            style={{ width: 30, height: 30}} />
          </button>
        </div>
        <nav className={`navlinkdropdown${isActive ? '-active': ''}`}>
          <ul className='list_link-active' style={{ animation: `${isActive ? 'open 0.5s ease-in-out' : 'close 1s linear'}`}}>
            <NavLink to='/gestao-de-pedidos' className='navlink' >Home</NavLink>
          <NavLink to='/gestao-de-pedidos/fiados' className='navlink' >Fiados</NavLink>
          <NavLink to='/gestao-de-pedidos/configuracoes' className='navlink' >Configurações</NavLink>
          </ul>
        </nav>
        </>
        ): (
          <div >
        <ul className='list_link'>
          <NavLink to='/gestao-de-pedidos' className='navlink' >Home</NavLink>
          <NavLink to='/gestao-de-pedidos/fiados' className='navlink' >Fiados</NavLink>
          <NavLink to='/gestao-de-pedidos/configuracoes' className='navlink' >Configurações</NavLink>
        </ul>
      </div>
          )}
          
    </nav>
  )
}
