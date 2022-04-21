import React, { useState, useEffect } from 'react'
import './Fiados.css'

import Sidebar from '../../../components/Sidebar/Sidebar'
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';

export default function Fiados() {
  const navigate = useNavigate()

  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(async () => {
  await GetFinanceiro();
}, [])

async function GetFinanceiro() {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/fiados/getall`)
  const data = await response.json()
  setData(data)
  setLoading(false)
  }

  return (
    <div className='container-fiados'>
      <Sidebar />
    <div className='fiados'>
      <h2>Fiados</h2>
    {loading ? <Loading /> : data.map((data) => {
      if (data.length === 0) {
        return (
          <div>
            <h2>Nenhum dado encontrado</h2>
          </div>
        )
      }
      return (
      <button onClick={ () => navigate(data._id) }>
        <div key={data._id} className="container-data" >
        <h3>nome: {data.name}</h3>
        <h3>Valor Total: R${data.valorTotal.reduce((prev, curr) => prev + curr.total, 0 )} </h3>
        </div>
      </button>
      )
})}
</div>
</div>
)
}

