import './style.css';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { TextField } from '@mui/material';

// Constante(variable) para que todos los inputs tengan el mismo ancho y color

const style = { width: '350px' };
const fondo = { background: 'white' };

const RecoverPass = () => {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(email);
  }, [email]);

  const fetchrecorpass = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/recover`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }
    );

    if (res.ok) {
      const body = await res.json();

      swal(body.message, '', 'success');
      setEmail(email);
    } else {
      const error = await res.json();
      swal(error.message);
    }
  };

  return (
    <div>
      <form className='form_recover_pass'>
        <label htmlFor='email' className='fraserecover'>
          {' '}
          ¿No recuerdas tu contraseña? Introduce tu correo electrónico y te
          indicaremos cómo conseguir una nueva{' '}
        </label>

        <TextField
          sx={fondo}
          style={style}
          id='email'
          label='E-mail'
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <button className='envioemail' onClick={fetchrecorpass}>
          {' '}
          Enviar email{' '}
        </button>
      </form>
    </div>
  );
};

export default RecoverPass;
