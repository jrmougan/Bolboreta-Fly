import { useEffect, useState } from "react";
import axios from "axios";

const useSearch = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const [filterData, setFilterData] = useState("default");

  const flightSearch = async (search, filter, controller) => {
    const signal = controller.signal;
    const { origin, destination, departureDate, returnDate, adults } =
      search.search;
    const { maxprice, scales } = filter;

    const body = {
      courrencyCode: "EUR",
      originLocationCode: origin,
      destinationLocationCode: destination,
      blacklistedInEUAllowed: true,
      departureDate: departureDate,
      includedCheckedBagsOnly: false,
      returnDate: returnDate,
      numAdults: adults,
      numChilds: 0,
      travelClass: "ECONOMY",
      sources: "GDS",
      maxFlighTime: 2,
      connections: Number(scales),
      oneway: 0,
      maxprice: maxprice,
    };

    const url = `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/advancesearch`;
    try {
      setLoading(true);
      const req = await axios.post(url, body, { signal });

      if (req.data.status === "ok") {
        setLoading(false);
        setData(req.data.data.data);
        setFilterData(req.data.filterdata);
      }
    } catch (error) {
      console.error(error);
      setError(error.response);
    }
  };

  return { flightSearch, error, loading, data, filterData };
};

export default useSearch;
