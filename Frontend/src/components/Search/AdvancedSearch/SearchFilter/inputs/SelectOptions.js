import { Slider, Grid, Select, InputLabel } from "@mui/material";

export const SelectOptions = (props) => {
  return (
    <Grid className="scaleInput" item md={12}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        native
        value={props.filterState.scale}
        onChange={props.handleChange}
        inputProps={{
          name: props.name,
          id: props.name,
        }}
        className="scales-flight"
      >
        {props.scales.map((scale) => {
          return (
            <option key={scale[1]} value={scale[1]}>
              {scale[0]}
            </option>
          );
        })}
      </Select>
    </Grid>
  );
};
