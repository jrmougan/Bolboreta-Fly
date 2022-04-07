import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useSearch from '../../../hooks/useSearch.js';
import { SearchFilter } from './SearchFilter/SearchFilter.js';
import './styles.css';
import { MoonLoader } from 'react-spinners';
import { ListFlights } from '../ListFlights/ListFlights';

import { findAirportInfo } from '../../StepperForm/InfoFlights/helpersFlight.js';

export const AdvancedSearch = (searchParams) => {
  const [search, setSearch] = useState(searchParams);

  // Extraemos los datos de la búsqueda

  const selectScales = [
    ['2 escalas', 2],
    ['1 escala', 1],
    ['Directo', 0],
  ];

  const [maxPrice, setMaxPrice] = useState(6000);

  //Estado Filtro
  const [filter, setFilter] = useState({
    scales: 2,
    duration: 99,
    maxprice: null,
  });

  //Hook para la búsqueda

  const { flightSearch, loading, data } = useSearch();

  //Efecto obtener búsqueda

  useEffect(() => {
    const controller = new AbortController();
    //Llamada a la api de búsqueda
    flightSearch(search, filter, controller);
  }, [filter, search]);

  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;

  let url = '';
  let withReturn = '';

  // Obtenemos los datos de los input para realizar la búsqueda
  const [origin, setOrigin] = useState(search.origin);
  const [destination, setDestination] = useState(search.destination);
  const [departureDate, setDepartureDate] = useState(search.departureDate);
  const [returnDate, setReturndate] = useState(search.returnDate);
  const [adults, setAdults] = useState(search.adults);

  return (
    <Grid container spacing={2}>
      {
        <Grid item xs={12}>
          <InfoSearch search={search} />
        </Grid>
      }
      <Grid item className='filter' xs={12} md={4}>
        <SearchFilter
          scales={selectScales}
          filterState={[filter, setFilter]}
          maxPrice={maxPrice}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        {loading ? <MoonLoader css={override} /> : <ListFlights data={data} />}
      </Grid>
    </Grid>
  );
};

const InfoSearch = ({ search }) => {
  const { origin, destination, departureDate, returnDate, adults } =
    search.search;
  findAirportInfo(origin, 'city');

  return (
    <React.Fragment>
      <article className='flight-info-container'>
        <div className='dates-flight-info items-flight-info'>
          <p className='item-flight-info'>
            <span className='bold'>Origen:</span>{' '}
            {findAirportInfo(origin, 'city')}
          </p>
          <p className='item-flight-info'>
            <span className='bold'>Destino:</span>{' '}
            {findAirportInfo(destination, 'city')}
          </p>
        </div>
        <div className='dates-flight-info items-flight-info'>
          <p className='item-flight-info'>
            <span className='bold'>Fecha Salida:</span> {departureDate}{' '}
          </p>
          {returnDate && (
            <p className='item-flight-info'>
              <span className='bold'>Fecha Vuelta:</span> {returnDate}{' '}
            </p>
          )}

          <p className='item-flight-info'>
            <span className='bold'>Adultos:</span>
            {adults}{' '}
          </p>
        </div>
      </article>
    </React.Fragment>
  );
};
