import { useEffect, useState } from 'react';

const useSearch = (searching) => {
  const { origin, destination, departureDate, returnDate, adults } = searching;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;

  useEffect(() => {
    console.log('useSearch');
    const search = async () => {
    setLoading(true);
    try {
      let fetchUrl = `${process.env.REACT_APP_PUBLIC_HOST_BACKEND}search?origin=${origin}&destination=${destination}&departuredate=${departureDate}&adults=${adults}`;
      console.log('fetchurl: ' + fetchUrl);
      if (returnDate) {
        fetchUrl += `&returndate=${returnDate}`;
      }
      const response = await fetch(fetchUrl);
      const body = await response.json();

      if (response.ok) {
        setData(body.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  }
  search();
  },[]);
  return [data, loading, override];
};

export default useSearch;
