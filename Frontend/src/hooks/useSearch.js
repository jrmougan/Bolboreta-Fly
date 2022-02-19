import { useContext, useEffect, useState } from 'react';
import { OfferPriceContextProvider } from '../context/OfferPriceContext';
import axios from "axios";

const useSearch = (searching) => {

  const [search, updateSearch] = useState(searching);
  const [filter, updateFilter] = useState();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState('');
  
  
  
  const url = `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/advancesearch`;
  
  const { origin, destination, departureDate, returnDate, adults, filterState } = search;
  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;


const body = {
  "courrencyCode":"EUR",
  "originLocationCode":origin,
  "destinationLocationCode":destination,
  "blacklistedInEUAllowed":true,
  "departureDate":departureDate,
  "includedCheckedBagsOnly":false,
  "returnDate":returnDate,
  "numAdults":adults,
  "numChilds":0,
  "travelClass":"ECONOMY",
  "sources":"GDS",
  "maxFlighTime":2,
  "connections":1,
  "oneway":1,
  "maxprice":1000
  };


const AxiosSearch = async () => {
  try {
    const req = await axios.post(url, body);
    console.log(req.data);
    if(req.data.status === 'ok'){
      setData(req.data.data.data);
      setLoading(false);
    }
  } catch (error) {
    console.error(error);
  }

}


useEffect(()=>{
  AxiosSearch()
},[]);






/*
    const search = async () => {
    setLoading(true);
    try {


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
    */
  };
  
  useEffect(() => {
    console.log('useSearch');
    search();

  }, [filter]);
  */






  return [data, loading, override];
}

export default useSearch;

