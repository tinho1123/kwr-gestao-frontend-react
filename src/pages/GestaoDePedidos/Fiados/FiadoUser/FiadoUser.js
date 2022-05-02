import React, { useEffect, useState } from 'react'
import './FiadoUser.css';
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../../components/Loading/Loading';
import axios from 'axios';

export default function FiadoUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetDataUser()
    }, [loading])

    async function GetDataUser() {
        if (loading){
        await axios.get(`${process.env.REACT_APP_DEVELOPMENT_URL_API}/fiados/${id}`, { headers: { token } })
        .then(({ data: { result } }) => {
            setData(result);
            setLoading(false);
        }).catch((err) => console.log(err))
    }}

  return (
    <div>
        {loading ? <Loading /> : (
            <div className='fiadouser'>
                <h2 className='fiadouser_nome'>{data.name}</h2>
                <h1>Pedidos feitos</h1>
                <button 
                    onClick={
                    () => axios.delete(`${process.env.REACT_APP_DEVELOPMENT_URL_API}/fiados/deletefiador/${id}`, { headers: { token }})
                        .then(() => navigate('/gestao-de-pedidos/fiados'))}
                >
                    Apagar Fiador
                </button>
                
                {data.valorTotal.map((product, index) => (
                    <div key={index}>
                        <div className='fiadouser_data_product'>
                            <h2>Data:</h2>
                            <h2>{product.data}</h2>
                        </div>
                        <div className='fiadouser_product'>
                        <h3>Quantidade: <br />{product.quantidade}</h3>
                        <h3>Produto: <br /> {product.produto}</h3>
                        <h3>Valor: <br /> {product.valor}</h3>
                        <h3>Total: <br /> {product.total}</h3>
                        <button onClick={ async () => {
                            setLoading(true)
                            const { _id: id } = data.valorTotal.find((_, i) => i === index );
                            await axios.delete(`${process.env.REACT_APP_DEVELOPMENT_URL_API}/fiados/deleteprodutofiador/${data._id}/${id}`, { headers: { token } })
                                .then(({ data: {result} }) => result.message && navigate('/gestao-de-pedidos/fiados'))
                                .catch((err) => console.log(err))
                            setLoading(false)
                        }}>Apagar Produto</button>
                        </div>
                    </div>
                ))}
            </div> 
        )}
    </div>
  )
}
