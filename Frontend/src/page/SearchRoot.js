import React from 'react';
import axios from 'axios';
import SearchAutocomplete from '../components/CitySearch/components/search-autocomplete';
import { getAmadeusData } from '../api/amadeus.api';

const SearchRoot = ({ setState, isOrigin }) => {
  const [search, setSearch] = React.useState({
    keyword: 'a',
    city: true,
    airport: true,
    page: 0,
  });

  const [dataSource, setDataSource] = React.useState({
    meta: { count: 0 },
    data: [],
  });

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);

    /* 
       out - data del backend.
       source - token para cancelación de la request
    */
    const { out, source } = getAmadeusData(search);

    out
      .then((res) => {
        // Así prevenimos error en el lado del Cliente
        if (!res.data.code) {
          setDataSource(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        axios.isCancel(err);
        setLoading(false);
      });

    // Cancelamos búsquedas
    return () => {
      source.cancel();
    };
  }, [search]);

  return (
    <div className='search-panel inputDiv'>
      <SearchAutocomplete
        search={search}
        setSearch={setSearch}
        setState={setState}
        isOrigin={isOrigin}
      />
    </div>
  );
};

export default SearchRoot;
