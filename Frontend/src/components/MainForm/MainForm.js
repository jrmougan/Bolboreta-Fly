import React, { useState, useEffect } from 'react';
import  useLocalStorage  from '../../hooks/useLocalStorage';
import './mainForm.css';
import ReactDOM from 'react-dom';
import { TextField } from '@mui/material';
import { FaArrowRight } from 'react-icons/fa';
import { useUserTokenContext } from '../../contexts/UserTokenContext';

const PORT_BACKEND = 4000;

const MainForm = () => {
  const [token, setToken] = useUserTokenContext();
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
        `http://localhost:${PORT_BACKEND}/register`,
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
      const bodyResponse = await response.json();
      if (bodyResponse.httpStattus === 400) {
        console.error(bodyResponse.message);
      }
      if (response.ok) {
        console.log('Te has registrado satisfactoriamente');
        console.log(bodyResponse.message);
        const tokenJWT = bodyResponse.accessToken;
        setRespuesta(response);

        setToken(tokenJWT);

        console.log('Aquí debería ir el token', token);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };

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
              type='password'
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
              type='password'
              id='passwordRepeat'
              value={passwordRepeat}
              className='inputForm'
              onChange={handleSubmit(setPasswordRepeat)}
              margin='dense'
            ></TextField>
          </div>
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
