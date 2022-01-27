import { TextField } from '@mui/material';
import { useState, useContext } from 'react';
import { useUserTokenContext } from '../../contexts/UserTokenContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const PORT_BACKEND = 4000;

const Login = () => {
  const [email, setEmail] = useLocalStorage('email', '')
  const [password, setPassword] = useLocalStorage('password','');
  const [token, setToken] = useUserTokenContext();

  console.log('token', token);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${PORT_BACKEND}/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (response.ok) {
        const body = await response.json();
        setToken(body.data.token);
      } else {
        const body = await response.json();
        alert(body.error);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  return (
    <div>
      <form onSubmit={login}>
        <div className='input_login'>
          <label htmlFor='email' className='label-input'>
            {' '}
            Email
          </label>
          <TextField
            type='text'
            id='email'
            value={email}
            className='inputForm'
            onChange={(e) => setEmail(e.target.value)}
            margin='dense'
          ></TextField>
        </div>
        <div className='input_login'>
          <label htmlFor='password' className='label-input'>
            {' '}
            Contraseña
          </label>
          <TextField
            type='password'
            id='password'
            value={password}
            className='inputForm'
            onChange={(e) => setPassword(e.target.value)}
            margin='dense'
          ></TextField>
          <button type='submit' className='login-btn'>
            Login
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          setToken('');
        }}
      >
        LOG OUT
      </button>
    </div>
  );
};

export default Login;
