import React, { useState } from 'react';
import { TextField, Autocomplete, MenuItem } from '@mui/material';
import '../style.css';

import MuiPhoneNumber from 'material-ui-phone-number';

const BookingData = () => {
  return (
    <div>
      <ContactData />
      <ContactData />
    </div>
  );
};

const ContactData = () => {
  const [nameBooking, setNameBooking] = useState('');
  const [lastNameBooking, setLastNameBooking] = useState('');
  const [lastNameBooking2, setLastnameBooking2] = useState('');
  // const [birthdate, setBirhdate] = useState('');
  const [typedocumentBooking, setTypeDocumentBooking] = useState('');
  const [documentBooking, setDocumentBooking] = useState('');
  const [addressBooking, setAddressBooking] = useState('');
  const [countryBooking, setCountryBooking] = useState('');
  const [cityBooking, setCityBooking] = useState('');
  const [phoneBooking, setPhoneBooking] = useState('');

  //  Estados potenciales
  const [inssuancedate, setInssuancedate] = useState('');
  const [expiredate, setExpiredate] = useState('');
  const [email, setEmail] = useState('');
  const [TypePhone, setTypePhone] = useState('');
  const [genero, setGenero] = useState('');

  // Función para controlar los inputs
  const handleSubmit = (setter) => (e) => {
    // e.preventDefault();
    setter(e.target.value);
  };

  return (
    <div className='bookingData'>
      <h3 className='ter-clr'>
        {' '}
        Introduce los datos de contacto para la reserva
      </h3>
      <form className='form_user'>
        <div className='identification_form'>
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder=' Nombre'
            value={nameBooking}
            onChange={handleSubmit(setNameBooking)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder=' Primer Apellido'
            value={lastNameBooking}
            onChange={handleSubmit(setLastNameBooking)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder=' Segundo Apellido'
            value={lastNameBooking2}
            onChange={handleSubmit(setLastnameBooking2)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder='DNI / NIF / CIF / NIE'
            value={typedocumentBooking}
            onChange={handleSubmit(setTypeDocumentBooking)}
            className='passenger-input'
            margin='dense'
          />
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder='Introduzca aquí el número del documento'
            value={documentBooking}
            onChange={handleSubmit(setDocumentBooking)}
            className='passenger-input'
            margin='dense'
          />
        </div>

        <div className='address_form'>
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder='Dirección'
            value={addressBooking}
            onChange={handleSubmit(setAddressBooking)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Country-required'
            placeholder='País'
            value={countryBooking}
            onChange={handleSubmit(setCountryBooking)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder='Ciudad'
            value={cityBooking}
            onChange={handleSubmit(setCityBooking)}
            className='passenger-input'
            margin='dense'
          />{' '}
          <TextField
            sx={{ marginInline: '1rem', width: '30%', marginTop: '2rem' }}
            required
            id='Apellido-required'
            placeholder='Teléfono de contacto'
            value={phoneBooking}
            onChange={handleSubmit(setPhoneBooking)}
            className='passenger-input'
            margin='dense'
          />
        </div>
      </form>
    </div>
  );
};

export default BookingData;
