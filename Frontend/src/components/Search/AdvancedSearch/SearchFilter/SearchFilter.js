import { Slider, Grid, Select, InputLabel } from "@mui/material";
import { SelectOptions } from "./inputs/SelectOptions";
import { SliderFilter } from "./inputs/SliderFilter";
import { SliderRange } from "./inputs/SliderRange";
import { useEffect, useState } from "react";

export const SearchFilter = ({
  scales,
  bagage,
  filterState,
  abort,
  maxPrice,
}) => {
  const [filter, setFilter] = filterState;

  //Manejadora evento

  const handleChange = (e) => {
    if (abort) abort.cancel();
    const name = e.target.name;
    setFilter({
      ...filter,
      [name]: e.target.value,
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
      <SelectOptions
        item
        filterState={filterState}
        scales={bagage}
        handleChange={handleChange}
        label="Maletas"
        name="bagage"
      />
      <SliderFilter
        item
        handleChange={handleChange}
        name="duration"
        min={1}
        max={24}
        label="Duracion"
      />

      <SliderFilter
        item
        handleChange={handleChange}
        name="precio"
        min={1}
        max={maxPrice}
        label="Precio"
      />
    </Grid>
  );
};
