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
        await axios.get(`${process.env.REACT_APP_PRODUCTION_URL_API}/fiados/${id}`, { headers: { token } })
        .then(({ data: { result } }) => {
            setData(result);
            setLoading(false);
        }).catch((err) => console.log(err))
    }}

  return (
    <div>
        {loading ? <Loading /> : (
            <div className='user'>
                <h2 className='nome'>{data.name}</h2>
                <h1>Pedidos feitos</h1>
                <button 
                    onClick={
                    () => axios.delete(`${process.env.REACT_APP_PRODUCTION_URL_API}/fiados/deletefiador/${id}`, { headers: { token }})
                        .then(() => navigate('/gestao-de-pedidos/fiados'))}
                >
                    Apagar Fiador
                </button>
                {data.valorTotal.map((product, i) => (
                    <div key={i}>
                        <div className='data-product'>
                            <h2>Data:</h2>
                            <h2>{product.data}</h2>
                        </div>
                        <div className='product'>
                        <h3>Quantidade: <br />{product.quantidade}</h3>
                        <h3>Produto: <br /> {product.produto}</h3>
                        <h3>Valor: <br /> {product.valor}</h3>
                        <h3>Total: <br /> {product.total}</h3>
                        </div>
                    </div>
                ))}
            </div> 
        )}
    </div>
  )
}
