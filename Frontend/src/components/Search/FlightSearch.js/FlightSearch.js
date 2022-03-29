import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  InputAdults,
  InputDepartureDate,
  InputDestination,
  InputOrigin,
  InputReturnDate,
} from "../BasicSearch/Inputs";
import Tabs from "./Tab";

const FlightSearch = ({
  search,
  origin,
  setOrigin,
  setDestination,
  destination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturndate,
  adults,
  setAdults,
  handleSubmit,
}) => {
  const [withReturn, setWithReturn] = useState(false);

  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}`;
  if (withReturn) {
    url += `&returnDate=${returnDate}`;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className="searchFlight">
        <Tabs withReturn={withReturn} setWithReturn={setWithReturn} />
        <InputSearch
          origin={origin}
          setOrigin={setOrigin}
          destination={destination}
          setDestination={setDestination}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturndate={setReturndate}
          url={url}
          adults={adults}
          setAdutls={setAdults}
          withReturn={withReturn}
          search={search}
        />
      </section>
    </LocalizationProvider>
  );
};

const InputSearch = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturndate,
  url,
  adults,
  setAdults,
  withReturn,
  search,
}) => {
  return (
    <form onSubmit={search} className="search-form">
      <div className="inputsFlight">
        <InputOrigin origin={origin} setOrigin={setOrigin} />

        <InputDestination
          destination={destination}
          setDestination={setDestination}
        />
        <InputDepartureDate
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
        />

        {withReturn && (
          <InputReturnDate
            departureDate={departureDate}
            returnDate={returnDate}
            setReturndate={setReturndate}
          />
        )}

        <InputAdults adults={adults} setAdults={setAdults} />
      </div>
      <Link to={url} className="btn search-submit" type="submit">
        Buscar
      </Link>
    </form>
  );
};

export { FlightSearch, InputSearch };
