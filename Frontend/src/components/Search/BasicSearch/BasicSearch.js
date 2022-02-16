import { Link, Outlet } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  AiOutlineUser,
} from 'react-icons/fa';
import NavLinks from '../../NavLinks/NavLinks';

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
            placeholder='Elija una ciudad'
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
        <Link
          to={`search/${origin}/${destination}/${departureDate}/${adults}`}
          className='btn btn-search'
          type='submit'
        >
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

          <Link
            to={`search/${origin}/${destination}/${departureDate}/${returnDate}/${adults}`}
            className='btn btn-search'
            type='submit'
          >
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
