import { useContext, useEffect, useState } from 'react';


const fetch = async () => {
    setLoading(true);
    try {

      const response = await fetch(fetchUrl);

      const body = await response.json();

      if (response.ok) {
        setData(body.data);
        console.log(data);
        // setFlightOffers(body.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error de comunicación', error);
    }
  };
  

  useEffect(()=>{
    console.log('useFetch');
    search();
  }, [url, body]);

  return setBody 