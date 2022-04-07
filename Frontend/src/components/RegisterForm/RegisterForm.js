import React, { useState } from 'react';
import { TextField } from '@mui/material';
import './style.css';
import swal from 'sweetalert';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Constante(variable) para que todos los inputs tengan el mismo ancho y color

const style = { width: '350px' };
const fondo = { background: 'white' };

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [birthdate, setBirthdate] = useState('birthdate', '1995/10/31');
  const [bio, setBio] = useState('');

  let navigate = useNavigate();

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/register`,
        {
          method: 'POST',
          body: JSON.stringify({
            name_user: nombre,
            lastname: primerApellido,
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

        swal(bodyReponse.message, '', 'success');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        const error = await response.json();
        swal(error.message, '', 'error');
      }
    } catch (error) {
      swal(error, '', 'error');
    }
  };
  //checkbox para mostrar contraseña
  const [shown, setShown] = useState(false);
  const switchShown = () => setShown(!shown);

  //checkbox para aceptar politica de privacidad y poder registrarte
  const [checked, setChecked] = useState(false);
  const switchChecked = () => setChecked(!checked);

  return (
    <main className='flex-column register-form-container'>
      <div className='form-title-container'>
        <h1 className='form-title'>
          Formulario de registro en Bolboreta Flight
        </h1>
      </div>
      <div className='mainForm'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={register} className='form flex-column'>
            <div className='input_container'>
              <label htmlFor='nombre_input' className='label-input'>
                Nombre
              </label>
              <TextField
                style={style}
                sx={fondo}
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
                style={style}
                sx={fondo}
                id='primerApellido'
                value={primerApellido}
                className='inputForm'
                onChange={handleSubmit(setPrimerApellido)}
                margin='dense'
              ></TextField>
            </div>

            <div className='input_container'>
              <label htmlFor='email' className='label-input'>
                {' '}
                E-mail
              </label>
              <TextField
                style={style}
                sx={fondo}
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
                style={style}
                sx={fondo}
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
                style={style}
                sx={fondo}
                type={shown ? 'text' : 'password'}
                id='passwordRepeat'
                value={passwordRepeat}
                className='inputForm'
                onChange={handleSubmit(setPasswordRepeat)}
                margin='dense'
              ></TextField>
            </div>
            <label className='showpass'>
              {' '}
              <input
                type='checkbox'
                name='newpassword'
                onClick={switchShown}
              />{' '}
              Mostrar contraseña{' '}
            </label>
            <div className='input_container'>
              <label htmlFor='birthday' className='label-input'>
                {' '}
                Fecha de Nacimiento
              </label>
              <DatePicker
                className='datePicker '
                label='Fecha de Nacimiento'
                inputFormat='dd/MM/yyyy'
                sx={{ backgroundColor: 'white', width: '100%' }}
                value={birthdate}
                onChange={(newValue) => {
                  if (newValue instanceof Date && !isNaN(newValue.valueOf())) {
                    setBirthdate(format(newValue, 'yyyy-MM-dd'));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      background: 'white',
                      width: '100%',
                    }}
                    {...params}
                  />
                )}
              ></DatePicker>{' '}
            </div>
            <div className='input_container'>
              <label htmlFor='bio' className='label-input'>
                Bio
              </label>
              <TextField
                style={style}
                sx={fondo}
                type='textarea'
                value={bio}
                onChange={handleSubmit(setBio)}
                id='bio'
                className='inputForm textarea'
              />
            </div>
            <label className='condicionesgenerales'>
              <input
                type='checkbox'
                className='politica'
                onChange={switchChecked}
              />
              Estoy de acuerdo con la{' '}
              <a href='/privacidad'> Política de Privacidad </a> y{' '}
              <a href='/terminosycondiciones'> Términos y condiciones </a>
            </label>

            <button type='submit' className='register-btn' disabled={!checked}>
              Enviar datos de Registro
            </button>
          </form>
        </LocalizationProvider>
      </div>
    </main>
  );
};

export default RegisterForm;
