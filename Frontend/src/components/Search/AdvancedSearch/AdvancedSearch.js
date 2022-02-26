import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch.js";
import { SearchFilter } from "./SearchFilter/SearchFilter.js";
import "./styles.css";
import { MoonLoader } from "react-spinners";
import { ListFlights } from "../ListFlights/ListFlights";
import axios from "axios";
export const AdvancedSearch = (searchParams) => {
  const [search, setSearch] = useState(searchParams);

  // Extraemos los datos de la búsqueda

  const selectScales = ["Directo", "1 escala", "2 escalas"];
  const bagage = [1, 2, 3, 4];
  const [maxPrice, setMaxPrice] = useState(1000);

  //Estado búsqueda
  /*
  const [search, setSearch] = useState({
    selectScales,
  });
*/
  //Estado Filtro
  const [filter, setFilter] = useState({
    scales: "",
    bagage: "",
    duration: 0,
    price: [100, 3000],
  });

  //Hook para la búsqueda

  const { flightSearch, loading, data } = useSearch();

  //Efecto obtener búsqueda

  useEffect(() => {
    const controller = new AbortController();
    //Llamada a la api de búsqueda
    flightSearch(search, filter, controller);
    if (data.length) {
      setMaxPrice(Math.ceil(data[data.length - 1].price.total));
    }

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
      <Grid item className="filter" xs={12} md={3}>
        <SearchFilter
          scales={selectScales}
          bagage={bagage}
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
