import React from 'react';
import { TextField, Autocomplete, MenuItem } from '@mui/material';
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
  return (
    <div className='bookingData'>
      <h2> Introduce los datos de contacto para la reserva</h2>
      <form className='form_user'>
        <div className='identification_form'>
          <TextField />
          <TextField />
          <TextField />
          <TextField />
        </div>

        <div className='address_form'>
          <TextField />
          <TextField />
          <TextField />
          <TextField />
        </div>
      </form>
    </div>
  );
};

export default BookingData;
