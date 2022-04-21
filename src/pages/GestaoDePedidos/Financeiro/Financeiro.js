import React, { useState, useEffect } from 'react'
import './Financeiro.css';
import Loading from '../../../components/Loading/Loading';
import Sidebar from '../../../components/Sidebar/Sidebar';


export default function Financeiro() {

  const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(async () => {
  await GetFinanceiro();
}, [])

async function GetFinanceiro() {
  const response = await fetch(`${process.env.REACT_APP_URL_API}/api/financial/getall`)
  const data = await response.json()
  setData(data)
  setLoading(false)
  }

  return (
    <div className='container-financeiro'>
      <Sidebar />
    <div className='financeiro'>
      <h2>Financeiro</h2>
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
</div>
)
}
