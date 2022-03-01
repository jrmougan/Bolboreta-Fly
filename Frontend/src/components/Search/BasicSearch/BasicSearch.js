import { Link, Outlet } from "react-router-dom";
import { InputLabel, Select, MenuItem } from "@mui/material";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  AiOutlineUser,
  FaWpforms,
  FaUserFriends,
} from "react-icons/fa";
import NavLinks from "../../NavLinks/NavLinks";
import { ADULTS } from "../../StepperForm/InfoFlights/constantInfo";
import {
  InputAdults,
  InputDepartureDate,
  InputDestination,
  InputOrigin,
  InputReturnDate,
} from "./Inputs";

export const BasicSearch = ({
  search,
  origin,
  setOrigin,
  setDestination,
  destination,
  departureDate,
  setDepartureDate,
  adults,
  setAdults,
  handleSubmit,
}) => {
  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}`;
  return (
    <section className="searchFlight">
      <NavLinks />
      <form onSubmit={search}>
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
          <InputAdults adults={adults} setAdults={setAdults} />
        </div>
        <Link to={url} className="btn btn-search" type="submit">
          Buscar
        </Link>
      </form>
    </section>
  );
};
export const RoundTrip = ({
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
  let url = `/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}`;
  return (
    <section className="searchFlight">
      <NavLinks />
      {
        <form onSubmit={search}>
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
            <InputReturnDate
              returnDate={returnDate}
              setReturndate={setReturndate}
            />

            <InputAdults adults={adults} setAdults={setAdults} />
          </div>
          <Link to={url} className="btn btn-search" type="submit">
            Buscar
          </Link>
        </form>
      }
    </section>
  );
};

