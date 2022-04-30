import React, { useState, useEffect } from 'react'
import './Financeiro.css';
import Loading from '../../../components/Loading/Loading';
import Sidebar from '../../../components/Sidebar/Sidebar';
import axios from 'axios';


export default function Financeiro() {

  const [data, setData] = useState([]);
  const [dataProdutos, setDataProdutos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState({});

useEffect(async () => {
  await GetFinanceiro();
}, [loading])

async function GetFinanceiro() {
  if (loading) {
  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/vendas/getall`)
    .then(({ data: { result } }) => {
      setData(result)
    }).catch((err) => console.log(err))
  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/produtos/getall`)
    .then(( { data: { result } }) => {
      setDataProdutos(result)
      setLoading(false);
    }).catch((err) => console.log(err))
  }
  }

  const forma_pagamento = [
    { name: '', porcentagem: 1},
    { name:'Dinheiro', porcentagem: 1 },
    {name:'Cartão de Débito', porcentagem: 0.98 },
    {name:'Cartão de Crédito', porcentagem: 0.96  }
  ]

  return (
    <div className='container-financeiro' >
      <Sidebar />
    <div className='financeiro'>
      <h2>Financeiro</h2>
      <div className='cadastro-produto'>
        <h3>produto: 
          <br />
          <select onChange={ ({ target }) => {
            const produto = dataProdutos.find((produto) => produto.produto.includes(target.value))
            setProduto(produto.produto)
            setValor(produto.valor)
          }}
            >
            {dataProdutos.map((produto, index) => 
            <option value={produto.produto} key={index}>{produto.produto}</option>
              )}
          </select>
          </h3>
          <h3>Valor: <input type='number' onChange={({target}) => setValor(target.value)} value={valor}/></h3>
          <h3>Quantidade: <input type='number' onChange={({target}) => setQuantidade(target.value)} value={quantidade}/></h3>
          <h3>Pagamento: 
          <select onChange={({target}) => {
            const pagamento = forma_pagamento.find((pagamen) => pagamen.name.includes(target.value))
            setPagamento(pagamento)
          }}
          >
            {forma_pagamento.map((pagamento, index) => 
            <option value={pagamento.name} key={index} >{pagamento.name}</option>
              )}
          </select>
          </h3>
          <h3>Valor total: R${ (valor * quantidade / pagamento.porcentagem).toFixed(2) } </h3>
          <button onClick={ async () => {
            setLoading(true) 
            const total = (valor * quantidade / pagamento.porcentagem).toFixed(2)
            await axios.post(`${process.env.REACT_APP_PRODUCTION_URL_API}/vendas/createvenda`, {
              produto,
              valor,
              quantidade,
              metodo_pagamento: pagamento.name,
              total
            }).then(() => {
              setLoading(false)
            })

          }}
            >
              Cadastrar venda
          </button>
          </div>
    {loading ? <Loading /> : data.map((data) => {
      if (data.length === 0) (<h2>Nenhum dado encontrado</h2>)
      return (
      <div key={data._id} className="container-data" >
      <h3>Produto: {data.produto}</h3>
      <h3>Quantidade: {data.quantidade}</h3>
      <h3>Total: R${data.valor}</h3>
      <h3>Pagamento: {data.metodo_pagamento}</h3>
      <h3>Data: {data.data}</h3>
      </div>
      )
})}
</div>
</div>
)
}
