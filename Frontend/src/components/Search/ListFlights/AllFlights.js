import React from 'react';
import Flight from './Flight';

const AllFlights = ({ flight }) => {
  const isReturn = flight.itineraries.length > 1 ? true : false;
  const outboundItinerary = flight.itineraries[0];
  let roundtripItinerary;

  if (isReturn === false) {
    roundtripItinerary = flight.itineraries[1];
  }

  return (
    <React.Fragment>
      <Flight itinerary={outboundItinerary} />
      {isReturn && <Flight itinerary={roundtripItinerary} />}
    </React.Fragment>
  );
};

export default AllFlights;
