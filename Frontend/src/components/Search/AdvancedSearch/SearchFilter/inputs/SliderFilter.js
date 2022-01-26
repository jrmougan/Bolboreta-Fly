import { Slider, Grid, InputLabel } from "@mui/material";

export const SliderFilter = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputLabel>{props.label}</InputLabel>
      </Grid>
      <Grid item xs={12} justifyContent="center">
        <Slider
          valueLabelDisplay="auto"
          min={props.min}
          max={props.max}
          className="Slider"
          onChange={props.handleChange}
          name={props.name}
        />
      </Grid>
    </Grid>
  );
};
