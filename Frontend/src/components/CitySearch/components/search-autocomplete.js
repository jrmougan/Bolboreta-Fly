import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { getAmadeusData } from "../../../api/amadeus.api";

const SearchAutocomplete = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { errors } = props;

  const { setState } = props;
  const { isOrigin } = props;

  // Configure options format for proper displaying on the UI
  const names = options.map((i) => ({
    id: i.id,
    type: i.subType,
    name: i.name + ` (${i.iataCode})`,
  }));

  // Debounce func prevents extra unwanted keystrokes, when user triggers input events
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLoadData(search);
  }, [search]);

  React.useEffect(() => {
    if (keyword.length !== 0) {
      setLoading(true);
      const { out, source } = getAmadeusData({
        ...props.search,
        page: 0,
        keyword,
      });

      out
        .then((res) => {
          setOptions(res.data.data.data);
          const data = res.data.data.data;
          setState(data[0].iataCode);
          setLoading(false);
        })
        .catch((err) => {
          axios.isCancel(err);
          setOptions([]);
          setLoading(false);
        });

      return () => {
        source.cancel();
      };
    }
  }, [keyword]);

  const label = isOrigin ? "Origen" : "Destino";
  const errorlabel = isOrigin ? "origin" : "destination";

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: "100%" }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => {
        if (value && value.name) {
          props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }));
          setSearch(value.name);
          return;
        }
        setSearch("");
        props.setSearch((p) => ({ ...p, keyword: "a", page: 0 }));
      }}
      getOptionLabel={(option) => {
        return option.name;
      }}
      options={names}
      loading={loading}
      renderInput={(params) => {
        return (
          <TextField
            error={errors[errorlabel] ? true : false}
            helperText={errors[errorlabel]}
            label={label}
            fullWidth
            sx={{
              background: "white",
              marginLeft: " .5rem",
              marginTop: ".5rem",
              borderRadius: "4px",
            }}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              value: search,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        );
      }}
    />
  );
};

export default SearchAutocomplete;
