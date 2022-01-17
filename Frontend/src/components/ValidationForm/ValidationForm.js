import { useState } from 'react';
import './validation.css';

const ValidationForm = () => {
  const [registrationCode, setRegistrationCode] = useState();

  const handleRegistrationCode = (e) => {
    e.preventDefault();
    setRegistrationCode(e.target.value);
  };
  console.log(registrationCode);

  const validate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4000/register/validate/${registrationCode}`
      );
      const body = await res.json();
      if (body.httpStatus === 400) {
        console.error(body.message);
      }
      if (body.ok) {
        console.log('Se ha activado al usuario');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='registration_container'>
      <form onSubmit={validate} className='validation_form'>
        <div>
          <label htmlFor='validate_input' className='label-input'>
            {' '}
            Introduzca aquí su código de registro
          </label>
          <input
            type='text'
            id='validate_input'
            value={registrationCode}
            onChange={handleRegistrationCode}
          ></input>
        </div>
        <button className='validate_btn' type='submit'>
          Validar código de Registro
        </button>
      </form>
    </div>
  );
};

export default ValidationForm;
