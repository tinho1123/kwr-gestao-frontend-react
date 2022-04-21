import React, { useState, useEffect } from 'react'
import './Card.css';
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';

export default function Card(props) {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await GetFinanceiro();
  }, [])

  async function GetFinanceiro() {
    switch(location.pathname){
      case '/gestao-de-pedidos/fiados':
        const res = await fetch(`${process.env.REACT_APP_URL_API}/api/fiados/getall`)
        const dados = await res.json()
      setData(dados)
    break;
      case '/gestao-de-pedidos':
        const response = await fetch(`${process.env.REACT_APP_URL_API}/api/financial/getall`)
        const data = await response.json()
      setData(data)
        break;
    default:
    }

    setLoading(false)
  }

  return (
    <div className='card'>
      {loading ? <Loading /> : data.map((data) => {
        if (data.length === 0) {
          return (
            <div>
              <h2>Nenhum dado encontrado</h2>
            </div>
          )
        }
        return (
        <div key={data._id} className="container-data" >
        <p>id: {data._id}</p>
        <h3>nome: {data.name}</h3>
        <h3>Valor: {data.financials}</h3>
        </div>
        )
})}
    </div>
  )
}
