import { Link, Outlet } from 'react-router-dom';

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
            type='text'
            value={adults}
            onChange={handleSubmit(setAdults)}
            className='searchInput searchInput-1'
          ></input>
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

            <input
              type='text'
              value={adults}
              onChange={handleSubmit(setAdults)}
              className='searchInput searchInput-1'
            ></input>
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
          <input
            type='text'
            value={adults}
            onChange={handleSubmit(setAdults)}
            className='searchInput searchInput-1'
          ></input>
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
          <input
            type='text'
            value={adults}
            onChange={handleSubmit(setAdults)}
            className='searchInput searchInput-1'
          ></input>
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
          <input
            type='text'
            value={adults}
            onChange={handleSubmit(setAdults)}
            className='searchInput searchInput-1'
          ></input>
        </div>
        <button className='btn btn-search' type='submit'>
          Buscar
        </button>
      </form>
    </section>
  );
};
