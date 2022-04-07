import { React, useState, useContext, useEffect } from 'react';

import swal from 'sweetalert';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { TextField } from '@mui/material';

// Constante(variable) para que todos los inputs tengan el mismo ancho y color.

const style = { width: '350px' };
const fondo = { background: 'white' };

const EditPassForm = () => {
  const [oldpassword, setOldPass] = useState('');
  const [newpassword, setNewPass] = useState('');
  const [confirmnewpassword, setRepetPass] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const [doPassMatch, setDoPassMatch] = useState(false);

  let navigate = useNavigate();
  //checkbox para mostrar contraseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  useEffect(() => {
    if (newpassword === confirmnewpassword) {
      setDoPassMatch(true);
    } else {
      setDoPassMatch(false);
    }
  }, [newpassword, confirmnewpassword]);

  const fetchEditPass = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/user/${decodedToken?.id}/editpass`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldpassword, newpassword, confirmnewpassword }),
      }
    );
    if (res.ok) {
      const body = await res.json();
      swal(body.message, '', 'success');
      navigate('/');
    } else {
      const error = await res.json();
      console.log(error);
      swal(error.message, '', 'warning');
    }
  };
  if (!token) {
    return <Link to='/login' />;
  }

  return (
    <div className='formularioeditpass'>
      <form className='edit_pass_form' onSubmit={fetchEditPass}>
        <div className='input_container'>
          <label className='label_pass' htmlFor='oldpass'>
            {' '}
            Contraseña actual{' '}
          </label>
          <TextField
            sx={fondo}
            style={style}
            id='oldpass'
            name='oldpass'
            type={shown ? 'text' : 'password'}
            value={oldpassword}
            onChange={(e) => {
              setOldPass(e.target.value);
            }}
          />
        </div>
        <div className='input_container'>
          <label className='label_pass' htmlFor='newpass'>
            {' '}
            Escriba contraseña nueva{' '}
          </label>
          <TextField
            sx={fondo}
            style={style}
            id='newpass'
            name='newpass'
            type={shown ? 'text' : 'password'}
            value={newpassword}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
        </div>
        <div className='input_container'>
          <label className='label_pass' htmlFor='repetpass'>
            {' '}
            Repite contraseña nueva{' '}
          </label>
          <TextField
            sx={fondo}
            style={style}
            id='repetpass'
            name='repetpass'
            type={shown ? 'text' : 'password'}
            value={confirmnewpassword}
            onChange={(e) => {
              setRepetPass(e.target.value);
            }}
          />
        </div>
        <div className='submitContainer'>
          <label className='showpass'>
            {' '}
            <input
              type='checkbox'
              name='newpassword'
              onClick={switchShown}
            />{' '}
            Mostrar contraseña{' '}
          </label>

          <button type='submit' className='cambiarpass'>
            {' '}
            Cambiar contraseña{' '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassForm;
