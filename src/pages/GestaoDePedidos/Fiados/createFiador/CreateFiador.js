import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './CreateFiador.css';

export default function CreateFiador() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const [dataProdutos, setDataProdutos] = useState([]);
  const [name, setName] = useState('')
  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false)


  useEffect(()=> {
    dataProdutosFetch()
  })

  const dataProdutosFetch = async () => {
    await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/produtos/getall`, { headers: { token }})
    .then(( { data: { result } }) => {
      const data = result
      data.unshift({ produto: '', valor: 0 })
      setDataProdutos(data)
    }).catch((err) => console.log(err));
  }

  const createFiador = async () => {
    await axios.post(`${process.env.REACT_APP_PRODUCTION_URL_API}/fiados/createfiador`, {
      name,
      valorTotal: [
        {
          produto,
          valor,
          data: new Date().toLocaleDateString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit', second:'2-digit'}),
          quantidade,
          total: valor * quantidade
        }
      ]
    }, { headers: { token } }).then(() => setLoading(false), navigate('/gestao-de-pedidos/fiados'))
  }

  return (
    <div>
      <h3>Nome: <input type='text' onChange={({target}) => setName(target.value)} value={name}/></h3>
      <div>
        <h1>Produtos</h1>
        <h3>produto: 
          <select onChange={({target}) => {
            const find = dataProdutos.find((find) => find.produto.includes(target.value))
            setProduto(find.produto)
            setValor(find.valor)
            }}>
            {dataProdutos.map((produto, index) => 
            <option value={produto.produto} key={index} >{produto.produto}</option>
            )}
          </select>
        </h3>
        <h3>Valor: <input type='number' onChange={({target}) => setValor(target.value)} value={valor}/></h3>
        <h3>Quantidade: <input type='number' onChange={({target}) => setQuantidade(target.value)} value={quantidade}/></h3>
        <h3>Valor total: R${valor * quantidade}</h3>
        <button onClick={() => {
          setLoading(true)
          createFiador()
          }}>Cadastrar fiador</button>
        { loading && <h3>Carregando...</h3>}
        </div>
    </div>
  )
}
