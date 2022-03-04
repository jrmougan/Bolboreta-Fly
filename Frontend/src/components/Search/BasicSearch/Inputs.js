import { ADULTS } from '../../StepperForm/InfoFlights/constantInfo';

import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaWpforms,
  FaUserFriends,
} from 'react-icons/fa';
import React from 'react';
import SearchRoot from '../../../page/SearchRoot';

const handleSubmit = (setter) => (e) => {
  e.preventDefault();
  setter(e.target.value);
};

export const InputOrigin = ({ origin, setOrigin }) => {
  return (
    <div className='inputDiv grow-2'>
      <FaPlaneArrival className='faplane_icon' />
      <SearchRoot setState={setOrigin} isOrigin={true} />
    </div>
  );
};

export const InputDestination = ({ destination, setDestination }) => {
  return (
    <div className='inputDiv grow-2'>
      <FaPlaneArrival className='faplane_icon' />
      <SearchRoot setState={setDestination} />
    </div>
  );
};

export const InputDepartureDate = ({ departureDate, setDepartureDate }) => {
  return (
    <div className='inputDiv grow-1'>
      <FaWpforms className='faplane_icon' />
      <input
        type='date'
        className='searchInput searchInput-2'
        placeholder='Fechas'
        value={departureDate}
        onChange={handleSubmit(setDepartureDate)}
      ></input>
    </div>
  );
};

export const InputAdults = ({ adults, setAdults }) => {
  return (
    <div className='inputDiv grow-1'>
      <FaUserFriends className='faplane_icon' />
      <select
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
      </select>
    </div>
  );
};

export const InputReturnDate = ({ returnDate, setReturndate }) => {
  return (
    <div className='inputDiv grow-1'>
      <FaWpforms className='faplane_icon' />
      <input
        type='date'
        className='searchInput searchInput-2'
        placeholder='Fechas de vuelta'
        value={returnDate}
        onChange={handleSubmit(setReturndate)}
      ></input>
    </div>
  );
};
