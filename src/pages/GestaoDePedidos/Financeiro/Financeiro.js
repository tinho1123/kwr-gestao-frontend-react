import React from 'react'
import './Financeiro.css';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ContentCentral from '../../../components/ContentCentral/ContentCentral';


export default function Financeiro() {
  return (
    <div className='financeiro'>
      <Sidebar />
      <ContentCentral />
    </div>
  )
}
