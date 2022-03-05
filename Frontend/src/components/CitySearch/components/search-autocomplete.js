import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { getAmadeusData } from '../../../api/amadeus.api';

const SearchAutocomplete = (props) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [keyword, setKeyword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const { setState } = props;
  const { isOrigin } = props;

  //   console.log('options', options);
  // Configure options format for proper displaying on the UI
  const names = options.map((i) => ({ type: i.subType, name: i.name }));

  // Debounce func prevents extra unwanted keystrokes, when user triggers input events
  const debounceLoadData = useCallback(debounce(setKeyword, 1000), []);

  useEffect(() => {
    debounceLoadData(search);
  }, [search]);

  // Same example as in *SearchRoot* component
  React.useEffect(() => {
    setLoading(true);
    const { out, source } = getAmadeusData({
      ...props.search,
      page: 0,
      keyword,
    });

    out
      .then((res) => {
        console.log('res', res);

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
  }, [keyword]);

  const label = isOrigin ? 'Seleccione un origen' : 'Seleccione un destino';

  /*    city && airport
      ? 'City and Airports'
      : city
      ? 'City'
      : airport
      ? 'Airports'
      : ''; */

  return (
    // This is Material-UI component that also has it's own props
    <>
      <Autocomplete
        id='asynchronous-demo'
        // style={{ width: 300, marginBottom: '1rem' }}
        sx={{ width: '100%' }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        /*         getOptionSelected={(option, value) =>
          option.name === value.name && option.type === value.type
        } */
        onChange={(e, value) => {
          console.log('Onchange Value', value);
          if (value && value.name) {
            props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }));
            setSearch(value.name);
            return;
          }
          setSearch('');
          props.setSearch((p) => ({ ...p, keyword: 'a', page: 0 }));
        }}
        getOptionLabel={(option) => {
          return option.name;
        }}
        options={names}
        loading={loading}
        renderInput={(params) => {
          return (
            <TextField
              label={label}
              fullWidth
              sx={{ background: 'white' }}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value);
              }}
              variant='outlined'
              inputProps={{
                ...params.inputProps,
                value: search,
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          );
        }}
      />
    </>
  );
};

export default SearchAutocomplete;
