import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch.js";
import { SearchFilter } from "./SearchFilter/SearchFilter.js";
import "./styles.css";
import { MoonLoader } from 'react-spinners';
import { ListFlights } from '../ListFlights/ListFlights';

export const AdvancedSearch = (props) => {

  // Extraemos los datos de la búsqueda

  let {origin, destination, departureDate, returnDate, adults} = props.search;



  const selectScales = ["Directo", "1 escala", "2 escalas"];
  const bagage = [1, 2, 3, 4];

  //Estado búsqueda
  /*
  const [search, setSearch] = useState({
    selectScales,
  });
*/
    //Estado Filtro
    const [filterState, setFilterState] = useState({
      scales: "",
      bagage: "",
      duration: 0,
      price: [100, 3000],
    });
  

//Monitorización de estado de filtro de búsqueda


  const [data, search, loading, override] = useSearch(({origin, destination, departureDate, returnDate, adults}), [filterState]);

  console.log('data:' + data);


  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        headSearch
      </Grid>
      <Grid item className="filter" xs={12} md={3}>
        <SearchFilter scales={selectScales} bagage={bagage} filterState={[filterState,setFilterState]} />
      </Grid>
      <Grid item xs={12} md={9}>
      <ListFlights data={data}></ListFlights>
      </Grid>
    </Grid>
  );
};
