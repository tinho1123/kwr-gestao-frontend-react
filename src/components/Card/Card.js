import React, { useState, useEffect } from 'react'
import './Card.css';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Card(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    await getFinanceiro();
  }, [])

  async function getFinanceiro() {

    const response = await fetch(`${process.env.REACT_APP_URL_API}/gestao-de-pedidos/createfinancial`)
    const data = await response.json()
    
    setData(data)
    setLoading(false)
  }

  return (
    <div className='card'>
      {loading ? <Loading /> : data.map((data) => (
        <div key={data._id} className="container-data" >
        <p>id: {data._id}</p>
        <h3>nome: {data.name}</h3>
        <h3>Valor: {data.financials}</h3>
        </div>
      ))}
    </div>
  )
}
