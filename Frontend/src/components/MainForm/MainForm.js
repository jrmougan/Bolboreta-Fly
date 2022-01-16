import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './mainForm.css';
import ReactDOM from 'react-dom';
import { TextField } from '@mui/material';

const PORT = 4000;

const MainForm = () => {
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
  const [birthdate, setBirthdate] = useLocalStorage('birthday', '');
  const [token, setToken] = useLocalStorage('jwtToken', '');
  const [bio, setBio] = useLocalStorage('bio', '');

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:${PORT}/register`, {
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
      });
      if (response.ok) {
        const bodyResponse = await response.json();
        console.log(bodyResponse.message);
        console.log('Te has registrado satisfactoriamente');
        setToken(bodyResponse.accessToken);
        console.log(token);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  return (
    <main>
      <div className='mainForm' onSubmit={register}>
        <h1>Formulario de registro den Bolboreta Fly</h1>
        <form>
          <div className='input_container'>
            <label htmlFor='nombre_input'>Nombre</label>
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
            <label htmlFor='primerApellido'>Primer Apellido</label>
            <TextField
              id='primerApellido'
              value={primerApellido}
              className='inputForm'
              onChange={handleSubmit(setPrimerApellido)}
              margin='dense'
            ></TextField>
          </div>
          <div className='input_container'>
            <label htmlFor='segundoApellido'>Segundo Apellido</label>
            <input
              type='text'
              id='segundoApellido'
              value={segundoApellido}
              className='inputForm'
              onChange={handleSubmit(setSegundoApellido)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='email'> Ponga aquí su email</label>
            <input
              type='text'
              id='email'
              value={email}
              className='inputForm'
              onChange={handleSubmit(setEmail)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='password'> Ponga aquí su contraseña</label>
            <input
              type='password'
              id='password'
              value={password}
              className='inputForm'
              onChange={handleSubmit(setPassword)}
            ></input>
          </div>
          <div className='input_container'>
            <label className='label-input' htmlFor='passwordRepeat'>
              {' '}
              Repita su contraseña
            </label>
            <input
              type='password'
              id='passwordRepeat'
              value={passwordRepeat}
              className='inputForm'
              onChange={handleSubmit(setPasswordRepeat)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='birthday'> Cumpleaños</label>
            <input
              type='date'
              id='birthday'
              value={birthdate}
              className='inputForm'
              onChange={handleSubmit(setBirthdate)}
            ></input>
          </div>
          <div>
            <label htmlFor='bio'>Bio</label>
            <textarea
              value={bio}
              onChange={handleSubmit(setBio)}
              id='bio'
            ></textarea>
          </div>
          {
            <div>
              <label>Avatar</label>
              <input type='file'></input>
            </div>
          }

          <button
            type='submit'
            style={{
              backgroundColor: 'blue',
              padding: '1rem 2rem',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default MainForm;
