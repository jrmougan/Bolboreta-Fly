import React, { useState } from "react";
import "../css/homescreen.css";
import { FlightSearch } from "../components/Search/FlightSearch/FlightSearch";

const HomeScreen = () => {
  // Obtenemos los datos de los input para realizar la búsqueda
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturndate] = useState("");
  const [adults, setAdults] = useState("");

  // Función para modificar el valor de cada variable
  const handleSubmit = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
  };

  return (
    <main className="searchEnvironment">
      <FlightSearch
        destination={destination}
        origin={origin}
        departureDate={departureDate}
        returnDate={returnDate}
        adults={adults}
        setOrigin={setOrigin}
        setDestination={setDestination}
        setDepartureDate={setDepartureDate}
        setAdults={setAdults}
        handleSubmit={handleSubmit}
        setReturndate={setReturndate}
      />
    </main>
  );
};

export default HomeScreen;
