import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import '../css/homescreen.css';
import { RoundTrip } from '../components/Search/BasicSearch/BasicSearch';
import { ListFlights } from '../components/Search/ListFlights/ListFlights';
import useSearch from '../hooks/useSearch';

const HomeRound = () => {
  // Obtenemos los datos de los input y los guardamos en el localStorage
  // para mantenerlos si recarga la página

  const [origin, setOrigin] = useLocalStorage('origin', '');
  const [destination, setDestination] = useLocalStorage('password', '');
  const [departureDate, setDepartureDate] = useLocalStorage(
    'departureDate',
    ''
  );
  const [returnDate, setReturndate] = useState('');
  const [adults, setAdults] = useLocalStorage('adult', '');

  // Función para modificar el valor de cada variable
  // a través del onChange de cada input

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  // Objeto que aglutina los parámetros de búsqueda que usará
  // el Custom Hook useSearch

  const searching = {
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
  };

  // Obtenemos el resultado (vuelos) a través de data
  // y la función search para pasarla a través de las props a ListFlights

  const [data, search] = useSearch(searching);

  return (
    <main className='searchEnvironment'>
      {
        <RoundTrip
          destination={destination}
          search={search}
          origin={origin}
          setOrigin={setOrigin}
          setDestination={setDestination}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setAdults={setAdults}
          handleSubmit={handleSubmit}
          adults={adults}
          setReturndate={setReturndate}
        />
      }

      <ListFlights data={data} />
    </main>
  );
};

export default HomeRound;
