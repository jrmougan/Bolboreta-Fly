import { Slider, Grid, Select, InputLabel } from "@mui/material";
import { SelectOptions } from "./inputs/SelectOptions";
import { SliderFilter } from "./inputs/SliderFilter";
import { SliderRange } from "./inputs/SliderRange";
import { useEffect, useState } from "react";

export const SearchFilter = ({ scales, filterState, maxPrice }) => {
  const [filter, setFilter] = filterState;

  //Manejadora evento

  const handleChange = (e, val) => {
    const name = e.target.name || e.path[0].childNodes[0].name;

    setFilter({
      ...filter,
      [name]: val || e.target.value,
    });
  };

  //Manejadora slider

  //const handleSlider = (e, value, active) => {};

  return (
    <Grid
      container
      rowGap={5}
      className="filterContainer"
      flexDirection="column"
      alignItems="center"
    >
      <h1>Filtro de búsqueda</h1>
      <SelectOptions
        item
        filterState={filterState}
        scales={scales}
        handleChange={handleChange}
        label="Escalas"
        name="scales"
        className="scales-filter"
      />

      <SliderFilter
        item
        onChangeCommitted={handleChange}
        name="duration"
        min={10}
        max={99}
        label="Duracion"
        units="%"
      />

      <SliderFilter
        item
        onChangeCommitted={handleChange}
        name="maxprice"
        min={1}
        max={maxPrice}
        label="Precio"
        units="€"
      />
    </Grid>
  );
};
