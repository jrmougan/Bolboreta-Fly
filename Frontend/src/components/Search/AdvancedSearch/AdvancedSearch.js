import { Grid } from "@mui/material";
import { useState } from "react";
import { SearchFilter } from "./SearchFilter/SearchFilter.js";
import "./styles.css";

export const AdvancedSearch = (props) => {
  const selectScales = ["Directo", "1 escala", "2 escalas"];
  const bagage = [1, 2, 3, 4];

  const [search, setSearch] = useState({
    selectScales,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        headSearch
      </Grid>
      <Grid item className="filter" xs={12} md={3}>
        <SearchFilter scales={selectScales} bagage={bagage} />
      </Grid>
      <Grid item xs={12} md={9}>
        Results
      </Grid>
    </Grid>
  );
};
