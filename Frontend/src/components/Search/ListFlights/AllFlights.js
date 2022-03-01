import React from 'react';
import Flight from './Flight';

const AllFlights = ({ flight }) => {
  const { oneWay } = flight;
  const isReturn = !oneWay;

  const outboundItinerary = flight.itineraries[0];
  const roundtripItinerary = isReturn ? flight.itineraries[1] : '';
  return (
    <React.Fragment>
      <Flight itinerary={outboundItinerary} />
      {isReturn && <Flight itinerary={roundtripItinerary} />}
    </React.Fragment>
  );
};

export default AllFlights;
