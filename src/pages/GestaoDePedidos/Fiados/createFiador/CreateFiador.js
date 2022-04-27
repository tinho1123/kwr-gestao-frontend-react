import axios from 'axios';
import React, { useState } from 'react'
import './CreateFiador.css';

export default function CreateFiador() {
  const [name, setName] = useState('')
  const [produto, setProduto] = useState('')
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false)

  const produtos = [
    { name: '', value: '' },
    { name: 'Brahma Litro', value: 8.5 },
    { name: 'Antarctica Litro', value: 8.5 },
    { name: 'Brahma Latão', value: 5 },
    { name: 'Antarctica Latão', value: 5 }
  ]

  const createFiador = async () => {
    await axios.post(`${process.env.REACT_APP_URL_API}/fiados/createfiador`, {
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
    }).then(() => setLoading(false))
  }

  return (
    <div>
      <h3>Nome: <input type='text' onChange={({target}) => setName(target.value)} value={name}/></h3>
      <div>
        <h1>Produtos</h1>
        <h3>produto: 
          <select onChange={({target}) => setProduto(target.value)}>
            {produtos.map((produto, index) => 
            <option value={produto.name} key={index} >{produto.name}</option>
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
