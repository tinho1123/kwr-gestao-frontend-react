import React, { useState } from 'react'
import axios from 'axios';

import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    if( email.includes('@') && email.includes('.com') && senha.length > 6) {
      await axios.post(`${process.env.REACT_APP_URL_API}/login`, {
          email, senha
      })
      .then((data) => {
        setLoading(false);
        navigate('gestao-de-pedidos')
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
        setTimeout(() => {
          setError(false);
        }, 5000 )
      })
    }
}

  return (
    <div className='background'>
      <div className='menu'>
          <h2 className='titulo-menu'>KWR Gestão de pedidos</h2>
          <div className='form'>
            <div className='email'>
            {error && (
              <div className='error'>Email ou senha incorreta</div>
            )}
              <h2 className='text_input_email'>Digite seu email:</h2>
              <input
                id='input_email'
                type='email'
                name='input_email'
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='password'>
              <h2 className='text_input_senha'>Digite sua senha:</h2>
              <input
                type="password"
                name='password'
                id='input_senha'
                placeholder='Digite sua senha'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button
              className='button_form'
              type='button'
              onClick={handleClick}
            >
              {loading ? 'Carregando...' : 'Logar'}
            </button>
          </div>
      </div>

    </div>
  )
  }
