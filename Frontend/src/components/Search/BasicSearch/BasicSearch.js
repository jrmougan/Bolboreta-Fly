import { Link, Outlet } from 'react-router-dom';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

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
      <div className='searchTabs'>
        <Link to='/' className='tab tab-1'>
          Ida
        </Link>
        <Link to='/vuelta' className='tab tab-2'>
          Ida y vuelta
        </Link>
        <Link to='/multiples' className='tab tab-3'>
          {' '}
          Múltiples destinos
        </Link>
        <Outlet />
      </div>
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
          <FaPlaneDeparture style={{ fontSize: '15rem' }} />
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
        <button className='btn btn-search' type='submit'>
          Buscar
        </button>
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
      <div className='searchTabs'>
        <Link to='/' className='tab tab-1'>
          Ida
        </Link>
        <Link to='/vuelta' className='tab tab-2'>
          Ida y vuelta
        </Link>
        <Link to='/multiples' className='tab tab-3'>
          {' '}
          Múltiples destinos
        </Link>
      </div>
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

          <button className='btn btn-search' type='submit'>
            Buscar
          </button>
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
      <div className='searchTabs'>
        <Link to='/' className='tab tab-1'>
          Ida
        </Link>
        <Link to='/vuelta' className='tab tab-2'>
          Ida y vuelta
        </Link>
        <Link to='/multiples' className='tab tab-3'>
          {' '}
          Múltiples destinos
        </Link>
      </div>
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
