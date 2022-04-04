import React, { Fragment, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { AdvancedSearch } from "../components/Search/AdvancedSearch/AdvancedSearch";
import { WiCloud } from "react-icons/wi";
import "../css/cloudsAnimation.css";

const AdvancedSearchScreen = () => {
  let params = useQuery();
  let origen = params.get("origin");
  let destino = params.get("destination");
  let diaSalida = params.get("departureDate");
  let diaLlegada = params.get("returnDate");
  let adultos = params.get("adults");

  const search = {
    origin: origen,
    destination: destino,
    departureDate: diaSalida,
    returnDate: diaLlegada,
    adults: adultos,
  };

  const Clouds = () => {
    return (
      <React.Fragment>
        <WiCloud className="cloud-moving-1" />
        <WiCloud className="cloud-moving-2" />
        <WiCloud className="cloud-moving-3" />
        <WiCloud className="cloud-moving-4" />
      </React.Fragment>
    );
  };

  return (
    <Fragment>
      <Clouds />
      <AdvancedSearch search={search} />
    </Fragment>
  );
};

export default AdvancedSearchScreen;
