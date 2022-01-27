import { useEffect, useState } from 'react';

const useSearch = (searching) => {
  const { origin, destination, departureDate, returnDate, adults } = searching;

  const [data, setData] = useState('');

  const search = async (e) => {
    e.preventDefault();

    try {
      let fetchUrl = `http://localhost:4000/search?origin=${origin}&destination=${destination}&departuredate=${departureDate}&adults=${adults}`;
      if (returnDate) {
        fetchUrl += `&returndate=${returnDate}`;
      }
      const response = await fetch(fetchUrl);
      const body = await response.json();

      if (response.ok) {
        setData(body.data.data);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  return [data, search];
};

export default useSearch;
