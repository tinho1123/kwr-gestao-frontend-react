import React, { useState, useEffect } from 'react'
import './Financeiro.css';
import Loading from '../../../components/Loading/Loading';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';


export default function Financeiro() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState('');

useEffect(async () => {
  await GetFinanceiro();
}, [loading])

async function GetFinanceiro() {
  if (loading) {
  await axios.get(`${process.env.REACT_APP_URL_API}/financial/getall`)
    .then(({data}) => {
      setData(data)
      setLoading(false)
    })
  }
  }

  const produtos = [
    { name: '', value: '' },
    { name: 'Brahma Litro', value: 8.5 },
    { name: 'Antarctica Litro', value: 8.5 },
    { name: 'Brahma Latão', value: 5 },
    { name: 'Antarctica Latão', value: 5 }
  ]

  const forma_pagamento = ['' ,'Dinheiro', 'Cartão de Débito', 'Cartão de Crédito']

  return (
    <div className='container-financeiro'>
      <Sidebar />
    <div className='financeiro'>
      <h2>Financeiro</h2>
      <div className='cadastro-produto'>
        <h3>produto: 
          <select onChange={({target}) => setProduto(target.value)}>
            {produtos.map((produto, index) => 
            <option value={produto.name} key={index} >{produto.name}</option>
              )}
          </select>
          </h3>
          <h3>Valor: <input type='number' onChange={({target}) => setValor(target.value)} value={valor}/></h3>
          <h3>Quantidade: <input type='number' onChange={({target}) => setQuantidade(target.value)} value={quantidade}/></h3>
          <h3>Pagamento: 
          <select onChange={({target}) => setPagamento(target.value)}>
            {forma_pagamento.map((pagamento, index) => 
            <option value={pagamento} key={index} >{pagamento}</option>
              )}
          </select>
          </h3>
          <h3>Valor total: R${valor * quantidade}</h3>
          <button onClick={() => {
            setLoading(true) 
            setTimeout(() => {
            setLoading(false)}
            ,2000)}
            }
            >
              Cadastrar produto
          </button>
          </div>
    {loading ? <Loading /> : data.map((data) => {
      if (data.length === 0) (<h2>Nenhum dado encontrado</h2>)
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
