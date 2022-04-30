import React, { useState, useEffect } from 'react'
import './Fiados.css'

import Sidebar from '../../../components/Sidebar/Sidebar'
import Loading from '../../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Fiados() {
  const navigate = useNavigate()

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

useEffect(async () => {
  await GetFinanceiro();
}, [loading])

function filterProducts(value) {
  setTimeout(() => {
    const dado = data.filter((dado) => dado.name.toLowerCase().includes(value))
    setFilter(dado);
  }, 100);
}

async function GetFinanceiro() {
  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/fiados/getall`)
    .then(({ data: { result } }) => {
      setData(result)
      setFilter(result)
      setLoading(false)
    }).catch((err) => setError(err))
  }

  return (
    <div className='container-fiados'>
      <Sidebar />
    <div className='fiados'>
        <h2>Fiados</h2>
        <input
          type='text'
          className='btn-filter'
          onChange={({ target: { value } }) => filterProducts(value) }
          placeholder="Digite o nome do Fiador" 
        />
        <button className='btn-new-fiador' onClick={ () => navigate('createfiador')}>Criar novo fiador</button>
    {loading ? <Loading /> : filter.map((data) => {
      if (data.length < 1 ) {
          return (
          <div>
            <h2>Nenhum dado encontrado</h2>
          </div>
          )
      }
      return (
      <button className='btn-fiados-user' onClick={ () => navigate(data._id) }>
        <div key={data._id} className="container-data" >
        <h3>nome: {data.name}</h3>
        <h3>Valor Total: R${data.valorTotal.reduce((prev, curr) => Number(prev) + Number(curr.total), 0 )} </h3>
        </div>
      </button>
      )
})}
</div>
</div>
)
}

