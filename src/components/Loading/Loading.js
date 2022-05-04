import React, { useContext } from 'react'
import './Loading.css';
import Context from '../../context/Context';

export default function Loading() {
  const {changeTheme} = useContext(Context)
  return (
    <div style={{color: changeTheme.color}}>Loading</div>
  )
}
