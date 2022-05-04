import React, { useState } from 'react'
import Context from './Context'
import themes from './Themes';

export default function ThemeContext({children}) {
  const [buttonChangeTheme, setButtonChangeName] = useState(false)
  const [changeTheme, setChangeTheme] = useState(themes.light);

  const toggleTheme = () => 
  changeTheme === themes.light 
  ? setChangeTheme(themes.dark) 
  : setChangeTheme(themes.light)
  
 
  const items = {
    changeTheme,
    toggleTheme,
    buttonChangeTheme, 
    setButtonChangeName
  }
  return (
    <Context.Provider value={items}>{children}</Context.Provider>
  )
}
