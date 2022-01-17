import { cardActionAreaClasses } from '@mui/material';
import '../css/homescreen.css';
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ListFlights } from '../components/ListFlights';
const PORT = 4000;

const HomeScreen = () => {
  const [origin, setOrigin] = useLocalStorage('origin', '');
  const [destination, setDestination] = useLocalStorage('password', '');
  const [departureDate, setDepartureDate] = useLocalStorage(
    'departureDate',
    ''
  );
  const [returndate, setReturndate] = useState('');
  const [adults, setAdults] = useLocalStorage('adult', '');
  const [data, setData] = useState('');

  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [departuretime, setDepartureTime] = useState('');
  const [idFlight, setIdFlight] = useState('');

  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const search = async (e) => {
    e.preventDefault();
    console.log(origin);
    console.log(destination);
    console.log(departureDate);
    console.log(adults);
    try {
      const response = await fetch(
        `http://localhost:4000/search?origin=${origin}&destination=${destination}&departuredate=${departureDate}&adults=${adults}`
      );
      const body = await response.json();
      const flights = body.data.data;
      console.log(flights);
      /*       if (response.httpStatus === 400) {
        console.log('Edu es por aquí');
      } */
      if (response.ok) {
        console.log('Los itinerarios son => ', flights[0].itineraries);

        console.log(
          'Su vuelo despegará a las => ',
          flights[0].itineraries[0].segments[0].departure.at
        );

        console.log(
          'A elegido  => ',
          flights[0].travelerPricings[0].fareOption
        );

        setPrice(body.data.data[15].price.grandTotal);
        setData(body.data.data);
        console.log('Aquí es data:', data);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  /*   try {
    const response = await fetch(
      `http://localhost:4000/search?origin=${origin}&destination=${destination}&departuredate=${departureDate}&returndate=${returndate}&adults=${adults}`
    );
    const body = await response.json();
    const flights = body.data.data;
    console.log(flights);
    if (response.httpStatus === 400) {
      console.log('Edu es por aquí');
    }
    if (response.ok) {
      console.log(body.data.data);
      console.log(
        'Precio del segundo vuelo => ',
        body.data.data[10].price.grandTotal
      );
      setPrice(body.data.data[15].price.grandTotal);
      setData(body);
    }
  } catch (error) {
    console.error('Error de comunicación', error);
  }
};
 */

  return (
    <main className='searchEnvironment'>
      <section className='searchFlight'>
        <div className='searchTabs'>
          <button className='tab tab-1'>Ida</button>
          <button className='tab tab-2'>Ida y vuelta</button>
          <button className='tab tab-3'> Múltiples destinos</button>
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
            {/*             <input
              type='date'
              className='searchInput searchInput-2'
              placeholder='Fechas'
              value={returndate}
              onChange={handleSubmit(setReturndate)}
            ></input> */}
            {/* <select
              value={adults}
              onChange={handleSubmit(setAdults)}
              className='searchInput'
            >
              <option value='1'>1 adulto</option>
              <option value='2'>2 adultos</option>
              <option value='3'>3 adultos</option>
              <option value='4'>4 adultos</option>
              <option value='5'>5 adultos</option>
            </select> */}
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

      {/* <ResultCard /> */}
      <ListFlights data={data} />
    </main>
  );
};

/* const HomeScreen = () => {
  const [origin, setOrigin] = useLocalStorage('origin', '');
  const [destination, setDestination] = useLocalStorage('password', '');
  const [departureDate, setDepartureDate] = useLocalStorage(
    'departureDate',
    ''
  );
  const [returndate, setReturndate] = useState('');
  const [adults, setAdults] = useLocalStorage('adult', '');

  const [price, setPrice] = useState('');
  const [data, setData] = useState('');
  console.log([data]);
    const listaDeVuelos = data.map((elem) => (
    <li key={data.id}>
      <span>{data.type}</span>
    </li>
  ));

  return (
    <main>
      <div className='mainForm' onSubmit={search}>
        <h1>Búsqueda de vuelos</h1>
        <form>
          <div className='input_container'>
            <label htmlFor='origin'> Origen</label>
            <input
              type='text'
              id='origin'
              value={origin}
              className='inputForm'
              onChange={handleSubmit(setOrigin)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='destination'> Destination</label>
            <input
              type='text'
              id='destination'
              value={destination}
              className='inputForm'
              onChange={handleSubmit(setDestination)}
            ></input>
          </div>
          <div className='input_container'>
            <input
              type='date'
              id='departureDate'
              value={departureDate}
              className='inputForm'
              onChange={handleSubmit(setDepartureDate)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='returndate'> Return Date</label>
            <input
              type='date'
              id='returndate'
              value={returndate}
              className='inputForm'
              onChange={handleSubmit(setReturndate)}
            ></input>
          </div>
          <div className='input_container'>
            <label htmlFor='adults'> Adults</label>
            <input
              type='text'
              id='adults'
              value={adults}
              className='inputForm'
              onChange={handleSubmit(setAdults)}
            ></input>
          </div>

          <button
            type='submit'
            style={{
              backgroundColor: 'blue',
              padding: '1rem 2rem',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};
 */
export default HomeScreen;
