import React from "react";
import Flight from "./Flight";

const AllFlights = ({ flight }) => {
  const isReturn = flight.itineraries.length > 1 ? true : false;
  const outboundItinerary = flight.itineraries[0];

  const scalesOutbound = Number(flight.itineraries[0].segments.length - 1);
  let scalesRoundtrip;

  let roundtripItinerary;

  if (isReturn === true) {
    roundtripItinerary = flight.itineraries[1];
    scalesRoundtrip = Number(flight.itineraries[1].segments.length - 1);
  }
  return (
    <React.Fragment>
      <Flight itinerary={outboundItinerary} scales={scalesOutbound} />
      {isReturn && (
        <Flight itinerary={roundtripItinerary} scales={scalesRoundtrip} />
      )}
    </React.Fragment>
  );
};

export default AllFlights;
