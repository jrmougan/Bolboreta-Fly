import { useEffect, useState } from "react";
import axios from "axios";

const useSearch = (searching) => {
  const [search, updateSearch] = useState(searching);
  const [filter, updateFilter] = useState({});
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState("");

  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/advancesearch`
  );

  const { origin, destination, departureDate, returnDate, adults } = search;

  const override = `
  display: block;
  margin: 10rem auto;
  border-color: red;
`;

  const [body, setBody] = useState({
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
    connections: 1,
    oneway: 1,
    maxprice: 1000,
  });

  let source = axios.CancelToken.source();

  const AxiosSearch = async () => {
    try {
      setLoading(true);
      const req = await axios.post(url, body, { cancelToken: source.token });
      console.log(req.data);
      if (req.data.status === "ok") {
        setData(req.data.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(body);
    AxiosSearch();
  }, [search, filter]);

  return { data, loading, override, updateFilter, source };
};

export default useSearch;
