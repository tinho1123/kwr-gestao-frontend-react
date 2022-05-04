import React, { useContext } from 'react'
import Context from '../../../context/themeContext/Context'
import './configuracoes.css'

export default function Configuracoes() {
  const {changeTheme, 
        toggleTheme, 
        buttonChangeTheme,
        setButtonChangeName} = useContext(Context)
 
  return (
    <div 
    className='configuracoes'
    style={{ background: changeTheme.background, color: changeTheme.color }}
    >
      <h2>Configuracoes</h2>
      <h4>Switch Mode</h4>
      <label className="switch">
        <input
          type="checkbox" 
          onClick={toggleTheme} 
          checked={buttonChangeTheme}
          onChange={() => setButtonChangeName(!buttonChangeTheme)}
          />
        <span className="slider round"></span>
      </label>

    </div>
  )
}
