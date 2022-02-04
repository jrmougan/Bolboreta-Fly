import React, { useState, useContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import './mainForm.css';
import ReactDOM from 'react-dom';
import { TextField } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import { TokenContext } from '../../context/TokenContext';
import swal from 'sweetalert';



const MainForm = () => {
  const [token, setToken] = useContext(TokenContext);
  const [respuesta, setRespuesta] = useState('');
  const [nombre, setNombre] = useLocalStorage('nombre', '');
  const [primerApellido, setPrimerApellido] = useLocalStorage(
    'primerApellido',
    ''
  );
  const [segundoApellido, setSegundoApellido] = useLocalStorage(
    'segundoApellido',
    ''
  );
  const [email, setEmail] = useLocalStorage('email', '');
  const [password, setPassword] = useLocalStorage('password', '');
  const [passwordRepeat, setPasswordRepeat] = useLocalStorage(
    'passwordRepeat',
    ''
  );
  const [birthdate, setBirthdate] = useLocalStorage('birthdate', '1995/10/31');
  const [bio, setBio] = useLocalStorage('bio', '');

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}register`,
        {
          method: 'POST',
          body: JSON.stringify({
            name_user: nombre,
            lastname: primerApellido,
            lastname2: segundoApellido,
            email,
            password,
            confirmpassword: passwordRepeat,
            bio,
            birthdate: birthdate,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const bodyReponse = await response.json();
        const tokenJWT = bodyReponse.accessToken;
        setToken(tokenJWT);
        console.log(tokenJWT);
        swal(bodyReponse.message, '', 'success');
      } else {
        const error = await response.json();
        swal(error.message, '', 'error')
      }

    } catch (error) {
      swal(error, '', 'error');
    }
  };
  //checkbox para mostrar contraseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);
  return (
    <main>
      <div className='form-title-container'>
        <h1 className='form-title'>Formulario de registro en Bolboreta Fly</h1>
      </div>
      <div className='mainForm'>
        <form onSubmit={register} className='form'>
          <div className='input_container'>
            <label htmlFor='nombre_input' className='label-input'>
              Nombre
            </label>
            <TextField
              id='nombre_input'
              value={nombre}
              className='inputForm'
              onChange={handleSubmit(setNombre)}
            >
              Nombre
            </TextField>
          </div>
          <div className='input_container'>
            <label htmlFor='primerApellido' className='label-input'>
              Primer Apellido
            </label>
            <TextField
              id='primerApellido'
              value={primerApellido}
              className='inputForm'
              onChange={handleSubmit(setPrimerApellido)}
              margin='dense'
            ></TextField>
          </div>
          <div className='input_container'>
            <label htmlFor='segundoApellido' className='label-input'>
              Segundo Apellido
            </label>
            <TextField
              id='segundoApellido'
              value={segundoApellido}
              className='inputForm'
              onChange={handleSubmit(setSegundoApellido)}
              margin='dense'
            ></TextField>
          </div>

          <div className='input_container'>
            <label htmlFor='email' className='label-input'>
              {' '}
              Email
            </label>
            <TextField
              type='text'
              id='email'
              value={email}
              className='inputForm'
              onChange={handleSubmit(setEmail)}
              margin='dense'
            ></TextField>
          </div>
          <div className='input_container'>
            <label htmlFor='password' className='label-input'>
              {' '}
              Contraseña
            </label>
            <TextField
              type={shown ? 'text' : 'password'}
              id='password'
              value={password}
              className='inputForm'
              onChange={handleSubmit(setPassword)}
              margin='dense'
            ></TextField>
          </div>
          <div className='input_container'>
            <label className='label-input' htmlFor='passwordRepeat'>
              {' '}
              Confirmar contraseña
            </label>
            <TextField
              type={shown ? 'text' : 'password'}
              id='passwordRepeat'
              value={passwordRepeat}
              className='inputForm'
              onChange={handleSubmit(setPasswordRepeat)}
              margin='dense'
            ></TextField>
          </div>
          <label className='showpass'> <input type='checkbox' name='newpassword' onClick={switchShown} /> Mostrar contraseña </label>
          <div className='input_container'>
            <label htmlFor='birthday' className='label-input'>
              {' '}
              Cumpleaños
            </label>
            <TextField
              type='date'
              id='birthday'
              value={birthdate}
              className='inputForm input_birthday'
              onChange={handleSubmit(setBirthdate)}
              margin='dense'
            ></TextField>
          </div>
          <div className='input_container'>
            <label htmlFor='bio' className='label-input'>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={handleSubmit(setBio)}
              id='bio'
              className='inputForm textarea'
            ></textarea>
          </div>

          <div className='input_container'>
            <label className='label-input'>Avatar</label>
            <input type='file' className='inputForm'></input>
          </div>

          <button type='submit' className='register-btn'>
            Enviar datos de Registro <FaArrowRight />
          </button>
        </form>
      </div>
    </main>
  );
};

export default MainForm;
