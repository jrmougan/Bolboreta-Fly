import { Link, Outlet } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  AiOutlineUser,
  FaWpforms,
  FaUserFriends,
} from 'react-icons/fa';
import NavLinks from '../../NavLinks/NavLinks';
import { ADULTS } from '../../StepperForm/InfoFlights/constantInfo';

export const BasicSearch = ({
  search,
  origin,
  setOrigin,
  setDestination,
  destination,
  departureDate,
  setDepartureDate,
  adults,
  setAdults,
  handleSubmit,
}) => {
  let url = `/advance?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}`;
  return (
    <section className='searchFlight'>
      <NavLinks />
      <form onSubmit={search}>
        <div className='inputsFlight'>
          <div className='inputDiv'>
            <FaPlaneDeparture className='faplane_icon' />
            <input
              type='text'
              className='searchInput searchInput-1'
              id='origin'
              value={origin}
              onChange={handleSubmit(setOrigin)}
            ></input>
          </div>
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
        </div>
        <Link to={url} className='btn btn-search' type='submit'>
          Buscar
        </Link>
      </form>
    </section>
  );
};
export const RoundTrip = ({
  search,
  origin,
  setOrigin,
  setDestination,
  destination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturndate,
  adults,
  setAdults,
  handleSubmit,
}) => {
  let url = `/advance?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`;
  return (
    <section className='searchFlight'>
      <NavLinks />
      {
        <form onSubmit={search}>
          <div className='inputsFlight'>
            <input
              type='text'
              className='searchInput searchInput-1'
              id='origin'
              value={origin}
              onChange={handleSubmit(setOrigin)}
            ></input>
            <input
              type='text'
              className='searchInput searchInput-2'
              placeholder='Destino'
              value={destination}
              onChange={handleSubmit(setDestination)}
            ></input>
            <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={departureDate}
              onChange={handleSubmit(setDepartureDate)}
            ></input>

            <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={returnDate}
              onChange={handleSubmit(setReturndate)}
            ></input>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              className='searchInput searchInput-2 adultsInput'
              value={adults}
              label='Age'
              onChange={handleSubmit(setAdults)}
            >
              <MenuItem value={1}>1 adulto</MenuItem>
              <MenuItem value={2}>2 adultos</MenuItem>
              <MenuItem value={3}>3 adultos</MenuItem>
              <MenuItem value={4}>4 adultos</MenuItem>
              <MenuItem value={5}>5 adultos</MenuItem>
              <MenuItem value={6}>6 adultos</MenuItem>
            </Select>
          </div>

          <Link to={url} className='btn btn-search' type='submit'>
            Buscar
          </Link>
        </form>
      }
    </section>
  );
};
export const MultipleSearches = ({
  search,
  origin,
  setOrigin,
  setDestination,
  destination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturndate,
  adults,
  setAdults,
  handleSubmit,
}) => {
  return (
    <section className='searchFlight'>
      <NavLinks />
      <form onSubmit={search}>
        <div className='inputsFlight'>
          <input
            type='text'
            className='searchInput searchInput-1'
            id='origin'
            value={origin}
            onChange={handleSubmit(setOrigin)}
          ></input>
          <input
            type='text'
            className='searchInput searchInput-2'
            placeholder='Destino'
            value={destination}
            onChange={handleSubmit(setDestination)}
          ></input>
          <input
            type='date'
            className='searchInput searchInput-2'
            placeholder='Fechas'
            value={departureDate}
            onChange={handleSubmit(setDepartureDate)}
          ></input>
          {
            <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={returnDate}
              onChange={handleSubmit(setReturndate)}
            ></input>
          }
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            className='searchInput searchInput-2 adultsInput'
            value={adults}
            label='Age'
            onChange={handleSubmit(setAdults)}
          >
            <MenuItem value={1}>1 adulto</MenuItem>
            <MenuItem value={2}>2 adultos</MenuItem>
            <MenuItem value={3}>3 adultos</MenuItem>
            <MenuItem value={4}>4 adultos</MenuItem>
            <MenuItem value={5}>5 adultos</MenuItem>
            <MenuItem value={6}>6 adultos</MenuItem>
          </Select>
        </div>
        <div className='inputsFlight'>
          <input
            type='text'
            className='searchInput searchInput-1'
            id='origin'
            value={origin}
            onChange={handleSubmit(setOrigin)}
          ></input>
          <input
            type='text'
            className='searchInput searchInput-2'
            placeholder='Destino'
            value={destination}
            onChange={handleSubmit(setDestination)}
          ></input>
          <input
            type='date'
            className='searchInput searchInput-2'
            placeholder='Fechas'
            value={departureDate}
            onChange={handleSubmit(setDepartureDate)}
          ></input>
          {
            <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={returnDate}
              onChange={handleSubmit(setReturndate)}
            ></input>
          }
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            className='searchInput searchInput-2 adultsInput'
            value={adults}
            label='Age'
            onChange={handleSubmit(setAdults)}
          >
            <MenuItem value={1}>1 adulto</MenuItem>
            <MenuItem value={2}>2 adultos</MenuItem>
            <MenuItem value={3}>3 adultos</MenuItem>
            <MenuItem value={4}>4 adultos</MenuItem>
            <MenuItem value={5}>5 adultos</MenuItem>
            <MenuItem value={6}>6 adultos</MenuItem>
          </Select>
        </div>
        <div className='inputsFlight'>
          <input
            type='text'
            className='searchInput searchInput-1'
            id='origin'
            value={origin}
            onChange={handleSubmit(setOrigin)}
          ></input>
          <input
            type='text'
            className='searchInput searchInput-2'
            placeholder='Destino'
            value={destination}
            onChange={handleSubmit(setDestination)}
          ></input>
          <input
            type='date'
            className='searchInput searchInput-2'
            placeholder='Fechas'
            value={departureDate}
            onChange={handleSubmit(setDepartureDate)}
          ></input>
          {
            <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={returnDate}
              onChange={handleSubmit(setReturndate)}
            ></input>
          }
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            className='searchInput searchInput-2 adultsInput'
            value={adults}
            label='Age'
            onChange={handleSubmit(setAdults)}
          >
            <MenuItem value={1}>1 adulto</MenuItem>
            <MenuItem value={2}>2 adultos</MenuItem>
            <MenuItem value={3}>3 adultos</MenuItem>
            <MenuItem value={4}>4 adultos</MenuItem>
            <MenuItem value={5}>5 adultos</MenuItem>
            <MenuItem value={6}>6 adultos</MenuItem>
          </Select>
        </div>
        <button className='btn btn-search' type='submit'>
          Buscar
        </button>
      </form>
    </section>
  );
};
