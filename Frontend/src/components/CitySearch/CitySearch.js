import React from 'react';
import axios from 'axios';
import SearchAutocomplete from '../api/testing-autocomplete/search-autocomplete';
import { getAmadeusData } from '../api/amadeus.api';

// Main component
const CitySearch = ({ setState }) => {
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
    // Turn on loader animation
    setLoading(true);

    /* Getting data from amadeus api.
       out - our data that coming from backend.
       source - token for cancelation request.
    */

    const { out, source } = getAmadeusData(search);

    out
      .then((res) => {
        // If we send too many request to the api per second - we will get an error and app will break
        // Therefore we implemented simple check to prevent error on client side.
        if (!res.data.code) {
          setDataSource(res.data); // dispatching data to components state
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

  /* 
  #########################
  ## SEARCH AUTOCOMPLETE ##
  #########################
  */

  return (
    <div className='search-panel inputDiv'>
      <SearchAutocomplete
        search={search}
        setSearch={setSearch}
        setState={setState}
      />
    </div>
  );
};

export default CitySearch;
