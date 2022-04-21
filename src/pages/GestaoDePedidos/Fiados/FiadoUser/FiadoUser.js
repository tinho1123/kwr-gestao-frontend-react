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
        const result = await fetch('http://localhost:5000/api/fiados/62605d291934107dd6c99b61');
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
                    <div className='product'>
                        <h3>Quantidade: {product.quantidade}</h3>
                        <h3>Produto: {product.produto}</h3>
                        <h3>Valor: {product.valor}</h3>
                        <h3>Total: {product.total}</h3>
                        <h3>Data: {product.data}</h3>
                    </div>
                ))}
            </div> 
        )}
    </div>
  )
}
