import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useSearch from '../../../hooks/useSearch.js';
import { SearchFilter } from './SearchFilter/SearchFilter.js';
import './styles.css';
import { MoonLoader } from 'react-spinners';
import { ListFlights } from '../ListFlights/ListFlights';
import axios from 'axios';
export const AdvancedSearch = (searchParams) => {
  const [search, setSearch] = useState(searchParams);

  // Extraemos los datos de la búsqueda

  const selectScales = [
    ['Directo', 0],
    ['1 escala', 1],
    ['2 escalas', 2],
  ];

  const [maxPrice, setMaxPrice] = useState(6000);

  //Estado Filtro
  const [filter, setFilter] = useState({
    scales: 0,
    duration: 0,
    maxprice: null,
  });

  //Hook para la búsqueda

  const { flightSearch, loading, data } = useSearch();

  console.log('Data en AdvanceSearch', data);
  //Efecto obtener búsqueda

  useEffect(() => {
    const controller = new AbortController();
    //Llamada a la api de búsqueda
    flightSearch(search, filter, controller);

    /*
    return () => {
      console.log("cleaning up");
      if (controller) controller.abort();
    };*/
  }, [filter, search]);

  //updateFilter(filterState);

  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        headSearch
      </Grid>
      <Grid item className='filter' xs={12} md={3}>
        <SearchFilter
          scales={selectScales}
          filterState={[filter, setFilter]}
          maxPrice={maxPrice}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        {loading ? <MoonLoader css={override} /> : <ListFlights data={data} />}
      </Grid>
    </Grid>
  );
};
