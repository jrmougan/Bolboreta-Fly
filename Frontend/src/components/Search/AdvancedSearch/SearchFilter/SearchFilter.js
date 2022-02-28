import { Slider, Grid, Select, InputLabel } from "@mui/material";
import { SelectOptions } from "./inputs/SelectOptions";
import { SliderFilter } from "./inputs/SliderFilter";
import { SliderRange } from "./inputs/SliderRange";
import { useEffect, useState } from "react";

export const SearchFilter = ({ scales, filterState, maxPrice }) => {
  const [filter, setFilter] = filterState;

  //Manejadora evento

  const handleChange = (e, val) => {
    console.log("Evento");
    console.log(e);
    const name = e.target.name || e.path[0].childNodes[0].name;

    setFilter({
      ...filter,
      [name]: val || e.target.value,
    });
  };

  //Manejadora slider

  //const handleSlider = (e, value, active) => {};

  return (
    <Grid container spacing={2} flexDirection="column">
      <SelectOptions
        item
        filterState={filterState}
        scales={scales}
        handleChange={handleChange}
        label="Escalas"
        name="scales"
      />

      <SliderFilter
        item
        onChangeCommitted={handleChange}
        name="duration"
        min={1}
        max={24}
        label="Duracion"
      />

      <SliderFilter
        item
        onChangeCommitted={handleChange}
        name="maxprice"
        min={1}
        max={maxPrice}
        label="Precio"
      />
    </Grid>
  );
};
