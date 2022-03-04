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
    // Loader animation
    setLoading(true);

    /* 
       out - data del backend.
       source - token for cancelation request.
    */
    const { out, source } = getAmadeusData(search);

    out
      .then((res) => {
        // simple check to prevent error on client side.
        if (!res.data.code) {
          setDataSource(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        axios.isCancel(err);
        setLoading(false);
      });

    // If we returning function from *useEffect* - then this func will execute, when component will unmount
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
