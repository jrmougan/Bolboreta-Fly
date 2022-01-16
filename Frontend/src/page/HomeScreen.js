import './search.css';
import { cardActionAreaClasses } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const PORT = 4000;

const Search = () => {
  return (
    <main className='searchEnvironment'>
      <section className='searchFlight'>
        <div className='searchTabs'>
          <button className='tab tab-1'>Ida</button>
          <button className='tab tab-2'>Ida y vuelta</button>
          <button className='tab tab-3'> Múltiples destinos</button>
        </div>
        <form>
          <div className='inputsFlight'>
            <input
              type='text'
              className='searchInput searchInput-1'
              placeholder='Origen'
            ></input>
            <input
              type='text'
              className='searchInput searchInput-2'
              placeholder='Destino'
            ></input>
            <input
              type='month'
              className='searchInput searchInput-2'
              placeholder='Fechas'
            ></input>
            <select className='searchInput'>
              <option value='1'>1 adulto</option>
              <option value='2'>2 adultos</option>
              <option value='3'>3 adultos</option>
              <option value='4'>4 adultos</option>
              <option value='5'>5 adultos</option>
            </select>
          </div>
          <button className='btn btn-search'>Buscar</button>
        </form>
      </section>
    </main>
  );
};

export const HomeScreen = () => {
  const [origin, setOrigin] = useLocalStorage('email', '');
  const [destination, setDestination] = useLocalStorage('password', '');
  const [departureDate, setDepartureDate] = useLocalStorage(
    'passwordRepeat',
    ''
  );
  const [returndate, setReturndate] = useState('');
  const [adults, setAdults] = useLocalStorage('adult', '');

  const [price, setPrice] = useState('');
  const [data, setData] = useState('');
  console.log([data]);
  /*   const listaDeVuelos = data.map((elem) => (
    <li key={data.id}>
      <span>{data.type}</span>
    </li>
  )); */
  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/search?origin=AGP&destination=MAD&departuredate=2022-02-02&adults=1`
      );
      const body = await response.json();

      if (response.httpStatus === 400) {
        console.log('Edu es por aquí');
      }
      if (response.ok) {
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

export default HomeScreen;
