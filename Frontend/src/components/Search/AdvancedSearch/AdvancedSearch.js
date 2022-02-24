import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch.js";
import { SearchFilter } from "./SearchFilter/SearchFilter.js";
import "./styles.css";
import { MoonLoader } from "react-spinners";
import { ListFlights } from "../ListFlights/ListFlights";

export const AdvancedSearch = (props) => {
  // Extraemos los datos de la búsqueda

  let { origin, destination, departureDate, returnDate, adults } = props.search;

  const selectScales = ["Directo", "1 escala", "2 escalas"];
  const bagage = [1, 2, 3, 4];

  //Estado búsqueda
  /*
  const [search, setSearch] = useState({
    selectScales,
  });
*/

  //Monitorización de estado de filtro de búsqueda

  const { data, loading, override, updateFilter, source } = useSearch({
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
  });

  //updateFilter(filterState);
  console.log("data:" + loading);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        headSearch
      </Grid>
      <Grid item className="filter" xs={12} md={3}>
        <SearchFilter
          scales={selectScales}
          bagage={bagage}
          updateFilter={updateFilter}
          source={source}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        {loading ? <MoonLoader css={override} /> : <ListFlights data={data} />}
      </Grid>
    </Grid>
  );
};
