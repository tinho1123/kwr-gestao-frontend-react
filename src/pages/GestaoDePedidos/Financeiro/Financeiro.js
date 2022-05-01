import React, { useState, useEffect } from 'react'
import './Financeiro.css';
import Loading from '../../../components/Loading/Loading';
import axios from 'axios';


export default function Financeiro() {
  const token = localStorage.getItem('token')

  const [data, setData] = useState([]);
  const [dataProdutos, setDataProdutos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [pagamento, setPagamento] = useState({});

useEffect( () => {
   GetFinanceiro();
}, [loading])

async function GetFinanceiro() {
  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/vendas/getall`, {
    headers: {
      token
    }
  })
    .then(({ data: { result } }) => {
      setData(result)
    }).catch((err) => console.log(err))
  await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/produtos/getall`, {
    headers: {
      token
    }
  })
    .then(( { data: { result } }) => {
      const data = result
      data.unshift({ produto: '', valor: 0 })
      setDataProdutos(data)

      setLoading(false);
    }).catch((err) => console.log(err))
  }

  const forma_pagamento = [
    { name: '', porcentagem: 1},
    { name:'Dinheiro', porcentagem: 1 },
    {name:'Cartão de Débito', porcentagem: 0.98 },
    {name:'Cartão de Crédito', porcentagem: 0.96  }
  ]

  return (
    <div className='container-financeiro' >
    <div className='financeiro'>
      <h2>Financeiro</h2>
      <div className='cadastro-produto'>
        <div className='cadastro_produto_produto'>
        <h3>Produto:
          <br/> 
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
          </div>
          <div className='cadastro_produto_valor'>
            <h3>Valor:
              <br/> 
              <input type='number' onChange={({target}) => setValor(target.value)} value={valor}/></h3>
          </div>
          <div className='cadastro_produto_quantidade'>
            <h3>Quantidade:
              <br/>
              <input type='number' onChange={({target}) => setQuantidade(target.value)} value={quantidade}/></h3>
          </div>
          <div className='cadastro_produto_pagamento'>
            <h3>Pagamento:
              <br/> 
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
          </div>
          <div className='cadastro_produto_valor_total'>
          <h3>Valor total:
            <br/>
             R${ (valor * quantidade / pagamento.porcentagem).toFixed(2) } </h3>
          </div>
          <div className='cadastro_produto_btn'>
            <button onClick={ async () => {
              setLoading(true) 
              setData([])
              const total = (valor * quantidade / pagamento.porcentagem).toFixed(2)
              await axios.post(`${process.env.REACT_APP_PRODUCTION_URL_API}/vendas/createvenda`, {
                produto,
                valor,
                quantidade,
                data: new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'}),
                metodo_pagamento: pagamento.name,
                total
              }, 
              { 
                headers: {
                  token
              }
             }).then(() => {
                setLoading(false)
              })

            }}
              >
                Cadastrar venda
            </button>
          </div>
          </div>
    {loading ? <Loading /> : data.map((dado, index) => {
      if (dado.length === 0) (<h2>Nenhum dado encontrado</h2>)
      return (
      <div key={dado._id} className="container-data" >
      <h3>Produto: {dado.produto}</h3>
      <h3>Quantidade: {dado.quantidade}</h3>
      <h3>Total: R${dado.valor}</h3>
      <h3>Pagamento: {dado.metodo_pagamento}</h3>
      <h3>Data: {dado.data}</h3>
      <button onClick={
        async () => {
          setLoading(true)
          setData([])
          const { _id: id } = data.find((_, i) => i === index );
          await axios.delete(`${process.env.REACT_APP_PRODUCTION_URL_API}/vendas/deletevenda/${id}`, { headers: { token } })
          .then((data) => console.log(data))
          .catch((err) => console.log(err))
          setLoading(false)
        }
        }>Apagar venda</button>
      </div>
      )
})}
</div>
</div>
)
}
