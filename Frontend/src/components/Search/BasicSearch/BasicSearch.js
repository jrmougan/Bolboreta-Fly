import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Link } from 'react-router-dom';

import NavLinks from '../../NavLinks/NavLinks';
import {
  InputAdults,
  InputDepartureDate,
  InputDestination,
  InputOrigin,
  InputReturnDate,
} from './Inputs';

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
  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}`;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className='searchFlight'>
        <NavLinks />
        <form onSubmit={search}>
          <div className='inputsFlight'>
            <InputOrigin origin={origin} setOrigin={setOrigin} />
            <InputDestination
              destination={destination}
              setDestination={setDestination}
            />
            <InputDepartureDate
              departureDate={departureDate}
              setDepartureDate={setDepartureDate}
            />
            <InputAdults adults={adults} setAdults={setAdults} />
          </div>
          <Link to={url} className='btn search-submit' type='submit'>
            Buscar
          </Link>
        </form>
      </section>
    </LocalizationProvider>
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
  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className='searchFlight'>
        <NavLinks />
        {
          <form onSubmit={search}>
            <div className='inputsFlight'>
              <InputOrigin origin={origin} setOrigin={setOrigin} />
              <InputDestination
                destination={destination}
                setDestination={setDestination}
              />
              <InputDepartureDate
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
              />
              <InputReturnDate
                returnDate={returnDate}
                setReturndate={setReturndate}
              />

              <InputAdults adults={adults} setAdults={setAdults} />
            </div>
            <Link to={url} className='btn search-submit' type='submit'>
              Buscar
            </Link>
          </form>
        }
      </section>
    </LocalizationProvider>
  );
};
