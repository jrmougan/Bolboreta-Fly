import { useContext, useEffect, useState } from 'react';
import { OfferPriceContextProvider } from '../context/OfferPriceContext';

const useSearch = (searching) => {
  const { origin, destination, departureDate, returnDate, adults } = searching;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;

  //  Cambiamos este estado para que esté disponible globalmente
  // const [flightOffers, setFlightOffers] = useContext(OfferPriceContextProvider);

  const search = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let fetchUrl = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}/search?origin=${origin}&destination=${destination}&departuredate=${departureDate}&adults=${adults}`;
      if (returnDate) {
        fetchUrl += `&returndate=${returnDate}`;
      }
      const response = await fetch(fetchUrl);
      const body = await response.json();

      if (response.ok) {
        setData(body.data.data);
        console.log(data);
        // setFlightOffers(body.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  return [data, search, loading, override];
};

export default useSearch;