import { useState } from 'react';
import axios from 'axios';

const useSearch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState('');

  const flightSearch = async (search, filter, controller) => {
    const signal = controller.signal;
    const { origin, destination, departureDate, returnDate, adults } =
      search.search;
    const { maxprice, scales, duration } = filter;

    let body;

    if (returnDate) {
      body = {
        courrencyCode: 'EUR',
        originLocationCode: origin,
        destinationLocationCode: destination,
        blacklistedInEUAllowed: true,
        departureDate: departureDate,
        includedCheckedBagsOnly: false,
        returnDate: returnDate,
        numAdults: adults,
        numChilds: 0,
        travelClass: 'ECONOMY',
        sources: 'GDS',
        connections: Number(scales),
        oneway: 0,
        maxprice: maxprice,
        maxFlightTime: duration * 10,
      };
    } else {
      body = {
        courrencyCode: 'EUR',
        originLocationCode: origin,
        destinationLocationCode: destination,
        blacklistedInEUAllowed: true,
        departureDate: departureDate,
        includedCheckedBagsOnly: false,
        numAdults: adults,
        numChilds: 0,
        travelClass: 'ECONOMY',
        sources: 'GDS',
        connections: Number(scales),
        oneway: 1,
        maxprice: maxprice,
        maxFlightTime: duration * 10,
      };
    }

    const url = `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/advancesearch`;
    try {
      setLoading(true);
      const req = await axios.post(url, body, { signal });

      if (req.data.status === 'ok') {
        setLoading(false);
        setData(req.data.data.data);
      }
    } catch (error) {
      setError(error.response);
    }
  };

  return { flightSearch, error, loading, data };
};

export default useSearch;
