import { useEffect, useState } from 'react';
import airports from './airports.json';

const styling = { textAlign: 'center', marginTop: '3rem' };

const Autocomplete = () => {
  console.log(airports);
  return <Busquedas />;
};

const Busquedas = () => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    function findAirport() {
      const airportObject = airports.find((airport) => {
        return airport.code === search;
      });
      const airportName = airportObject.name;

      console.log(airportName);
    }
    findAirport();
  }, [search]);

  return (
    <div style={styling}>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
    </div>
  );
};

export default Autocomplete;
