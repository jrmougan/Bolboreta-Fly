import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from '../../NavLinks/NavLinks';

import {
  InputAdults,
  InputDepartureDate,
  InputDestination,
  InputOrigin,
  InputReturnDate,
} from '../BasicSearch/Inputs';
import Tabs from './Tab';

export const FlightSearch = ({
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
  const [withReturn, setWithReturn] = useState(false);

  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}`;
  if (withReturn) {
    url += `&returnDate=${returnDate}`;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className='searchFlight'>
        <Tabs withReturn={withReturn} setWithReturn={setWithReturn} />
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

            {withReturn && (
              <InputReturnDate
                returnDate={returnDate}
                setReturndate={setReturndate}
              />
            )}

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

export default FlightSearch;
