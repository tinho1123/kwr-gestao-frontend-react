import React, { useState, useEffect } from 'react'
import './Financeiro.css';
import Loading from '../../../components/Loading/Loading';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';


export default function Financeiro() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(async () => {
  await GetFinanceiro();
}, [])

async function GetFinanceiro() {
  await axios.get(`${process.env.REACT_APP_URL_API}/financial/getall`)
    .then(({data}) => {
      setData(data)
      setLoading(false)
    })
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
      <h3>Produto: {data.produto}</h3>
      <h3>Quantidade: {data.quantidade}</h3>
      <h3>Total: R${data.valor}</h3>
      <h3>Pagamento: {data.metodoPagamento}</h3>
      <h3>Data: {data.data}</h3>
      </div>
      )
})}
</div>
</div>
)
}
