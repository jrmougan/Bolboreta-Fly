import { ADULTS } from '../../StepperForm/InfoFlights/constantInfo';

import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaWpforms,
  FaUserFriends,
} from 'react-icons/fa';
import React from 'react';
import SearchRoot from '../../../page/SearchRoot';
import { DatePicker } from '@mui/lab';
import { Autocomplete, TextField } from '@mui/material';
import { format } from 'date-fns';

export const InputOrigin = ({ origin, setOrigin }) => {
  return (
    <div className='inputDiv grow-2'>
      <FaPlaneArrival className='faplane_icon' />
      <SearchRoot setState={setOrigin} isOrigin={true} />
    </div>
  );
};

export const InputDestination = ({ destination, setDestination }) => {
  console.log('destination', destination);
  return (
    <div className='inputDiv grow-2'>
      <FaPlaneArrival className='faplane_icon' />
      <SearchRoot setState={setDestination} />
    </div>
  );
};

export const InputDepartureDate = ({ departureDate, setDepartureDate }) => {
  console.log(departureDate);
  return (
    <div className='inputDiv grow-1'>
      <FaWpforms className='faplane_icon' />
      {
        <DatePicker
          className='datePicker '
          label='Día de salida'
          sx={{ backgroundColor: 'white', width: '100%' }}
          value={departureDate}
          onChange={(newValue) => {
            setDepartureDate(format(newValue, 'yyyy-MM-dd'));
          }}
          renderInput={(params) => (
            <TextField
              sx={{
                background: 'white',
                width: '100%',
                marginLeft: ' .5rem',
                marginTop: ' .5rem',
              }}
              {...params}
            />
          )}
        ></DatePicker>
      }
    </div>
  );
};

export const InputReturnDate = ({ returnDate, setReturndate }) => {
  return (
    <div className='inputDiv grow-1'>
      <FaWpforms className='faplane_icon' />
      <DatePicker
        className='datePicker '
        label='Día de llegada'
        sx={{ backgroundColor: 'white', width: '100%' }}
        value={returnDate}
        onChange={(newValue) => {
          setReturndate(format(newValue, 'yyyy-MM-dd'));
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              background: 'white',
              width: '100%',
              marginLeft: ' .5rem',
              marginTop: ' .5rem',
            }}
            {...params}
          />
        )}
      ></DatePicker>
    </div>
  );
};

export const InputAdults = ({ adults, setAdults }) => {
  console.log('adults', adults);
  return (
    <div className='inputDiv grow-1'>
      <FaUserFriends className='faplane_icon' />
      <Autocomplete
        sx={{ width: '100%' }}
        options={ADULTS}
        onChange={(e, newInput) => setAdults(newInput.value)}
        value={ADULTS.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Seleccione adultos'
            sx={{
              backgroundColor: 'white',
              marginLeft: ' .5rem',
              marginTop: ' .5rem',
            }}
          />
        )}
      />
      {/*       <select
        className='searchInput searchInput-2 adultsInput'
        value={adults}
        onChange={handleSubmit(setAdults)}
        placeholder='Adultos'
      >
        {ADULTS.map((adulto, key) => {
          return (
            <option value={adulto.value} key={key}>
              {adulto.label}
            </option>
          );
        })}
      </select> */}
    </div>
  );
};
