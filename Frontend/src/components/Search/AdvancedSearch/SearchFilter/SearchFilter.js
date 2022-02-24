import { Slider, Grid, Select, InputLabel } from "@mui/material";
import { SelectOptions } from "./inputs/SelectOptions";
import { SliderFilter } from "./inputs/SliderFilter";
import { SliderRange } from "./inputs/SliderRange";
import { useEffect, useState } from "react";

export const SearchFilter = ({ scales, bagage, updateFilter, source }) => {
  //Estado Filtro
  const [filterState, setFilterState] = useState({
    scales: "",
    bagage: "",
    duration: 0,
    price: [100, 3000],
  });

  //Efecto para actualizar el filtro

  useEffect(() => {
    source.cancel();
    updateFilter(filterState);
  }, [filterState]);

  //Manejadora evento

  const handleChange = (e) => {
    const name = e.target.name;
    setFilterState({
      ...filterState,
      [name]: e.target.value,
    });
  };

  //Manejadora slider

  const handleSlider = (e, value, active) => {
    console.log(e, value, active);
  };

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

      <SliderRange
        item
        handleSlider={handleChange}
        name="price"
        min={300}
        max={9000}
        label="Precio"
        state={filterState.price}
      />
    </Grid>
  );
};
