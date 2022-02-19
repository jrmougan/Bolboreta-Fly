import { ADULTS } from '../../StepperForm/InfoFlights/constantInfo';

import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaWpforms,
  FaUserFriends,
} from 'react-icons/fa';

const handleSubmit = (setter) => (e) => {
  e.preventDefault();
  setter(e.target.value);
};

export const InputOrigin = ({ origin, setOrigin }) => {
  return (
    <div className='inputDiv'>
      <FaPlaneDeparture className='faplane_icon' />
      <input
        type='text'
        className='searchInput searchInput-1'
        id='origin'
        value={origin}
        onChange={handleSubmit(setOrigin)}
        placeholder='Origen'
      ></input>
    </div>
  );
};

export const InputDestination = ({ destination, setDestination }) => {
  return (
    <div className='inputDiv'>
      <FaPlaneArrival className='faplane_icon' />
      <input
        type='text'
        className='searchInput searchInput-2'
        placeholder='Destino'
        value={destination}
        onChange={handleSubmit(setDestination)}
      ></input>
    </div>
  );
};

export const InputDepartureDate = ({ departureDate, setDepartureDate }) => {
  return (
    <div className='inputDiv'>
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
    <div className='inputDiv'>
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
    <div className='inputDiv'>
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
