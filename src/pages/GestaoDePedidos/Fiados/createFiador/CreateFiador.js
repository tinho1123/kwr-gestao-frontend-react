import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../../../context/themeContext/Context';
import './CreateFiador.css';

export default function CreateFiador(props) {
  const { changeTheme } = useContext(Context);
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

  const filterOptGroup = (filter) => {
    const data = dataProdutos.filter((produto) => produto.produto.toLowerCase().includes(filter.toLowerCase()));
    return (
      data.map((produto, i) => (
        <option value={produto.produto} key={i}>{produto.produto}</option>
      ))
    )
  }

  const dataProdutosFetch = async () => {
    await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/produtos/getall`, { headers: { token }})
    .then(( { data: { result } }) => {
      const data = result
      data.unshift({ produto: '', valor: 0 });
      setDataProdutos(data)
    }).catch(async ({response: { data } }) => {
      if (data.message.toLowerCase().includes('token')) {
        navigate('/')
      }
    })
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
    <div className='create_fiador_container' style={changeTheme}>
      <div className='create_fiador_form'>
        <h3>Nome: <br/> <input type='text' onChange={({target}) => setName(target.value)} value={name}/></h3>
        <div>
          <h1 style={{ textAlign: 'center'}}>Produtos</h1>
          <h3>produto: <br/>
          <input 
            type='text'
            list='product'
            onChange={({ target }) => setProduto(target.value)}
            onSelect={({target}) => setTimeout(() => {setValor(dataProdutos.find((elemen) => elemen.produto === target.value).valor)}, 1000)}
            />
            <datalist id='product'>
              {filterOptGroup('')}
            </datalist>
          </h3>
          <h3>Valor:  <br/> <input type='number' onChange={({target}) => setValor(target.value)} value={valor}/></h3>
          <h3>Quantidade: <br/> <input type='number' onChange={({target}) => setQuantidade(target.value)} value={quantidade}/></h3>
          <h3>Valor total: R${valor * quantidade}</h3>
          <button onClick={() => {
            setLoading(true)
            createFiador()
            }}>Cadastrar fiador</button>
          { loading && <h3>Carregando...</h3>}
          </div>
      </div>
    </div>
  )
}
