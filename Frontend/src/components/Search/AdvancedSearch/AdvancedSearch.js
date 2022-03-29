import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useSearch from "../../../hooks/useSearch.js";
import { SearchFilter } from "./SearchFilter/SearchFilter.js";
import "./styles.css";
import { MoonLoader } from "react-spinners";
import { ListFlights } from "../ListFlights/ListFlights";
import { getCityByID } from "../../../api/amadeus.api";

import axios from "axios";
import { findAirportInfo } from "../../StepperForm/InfoFlights/helpersFlight.js";
export const AdvancedSearch = (searchParams) => {
  const [search, setSearch] = useState(searchParams);

  // Extraemos los datos de la búsqueda

  const selectScales = [
    ["Directo", 0],
    ["1 escala", 1],
    ["2 escalas", 2],
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

  console.log("Data en AdvanceSearch", data);
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

  let url = "";
  let withReturn = "";
  console.log(search);
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
      <Grid item className="filter" xs={12} md={3}>
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

const InfoSearch = ({ search }) => {
  const { origin, destination, departureDate, returnDate, adults } =
    search.search;
  findAirportInfo(origin, "city");

  return (
    <div className="flightInfoSearch">
      <div className="airports">
        <div>
          <span>Origen:</span> <span>{findAirportInfo(origin, "city")}</span>
        </div>
        <div>
          <span>Destino:</span>{" "}
          <span>{findAirportInfo(destination, "city")}</span>
        </div>
      </div>
      <div className="dates">
        <div>
          <span>Fecha Salida</span> <span>{departureDate}</span>
        </div>
        {returnDate && (
          <div>
            <span>Fecha Llegada:</span>
            <span>{returnDate}</span>
          </div>
        )}
        <div>
          <span>Pasajeros:</span> <span>{adults}</span>
        </div>
      </div>
    </div>
  );
};
