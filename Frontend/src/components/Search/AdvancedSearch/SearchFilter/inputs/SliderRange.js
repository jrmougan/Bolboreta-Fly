import { Slider, Grid, InputLabel } from "@mui/material";

export const SliderRange = (props) => {
  return (
    <Grid>
      <InputLabel>{props.label}</InputLabel>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={props.state}
        onChange={props.handleSlider}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value}`}
        disableSwap
        defaultValue={[props.min, props.max]}
        max={props.max}
        min={props.min}
        name={props.name}
      />
    </Grid>
  );
};
