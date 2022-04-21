import React, { useEffect, useState } from 'react'
import './FiadoUser.css';
import { useParams } from 'react-router-dom'
import Loading from '../../../../components/Loading/Loading';

export default function FiadoUser() {
    const { id } = useParams();

    const [data, useData] = useState([]);
    const [loading, useLoading] = useState(true);
    
    useEffect(() => {
        GetDataUser()
    })

    async function GetDataUser() {
        const result = await fetch(`${process.env.REACT_APP_URL_API}/fiados/${id}`);
        const data = await result.json();
        useData(data);
        useLoading(false);
    }

  return (
    <div>
        {loading ? <Loading /> : (
            <div className='user'>
                <h2 className='nome'>{data.name}</h2>
                <h1>Pedidos feitos</h1>
                {data.valorTotal.map((product) => (
                    <div>
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
