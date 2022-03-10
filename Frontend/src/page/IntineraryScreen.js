import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import Itinerary from '../components/StepperForm/Itinerary/Itinerary';
import Summary from '../components/StepperForm/Itinerary/Summary/Summary';
import useGetFlightOrder from '../hooks/useGetFlightOrder';

const ItineraryScreen = () => {
  const bookingCode = 'eJzTd9cPdI2KcHIFAAupAnU%3D';

  const [flightOrder, loading] = useGetFlightOrder(bookingCode);
  console.log('Flight Order', flightOrder);

  // Si pongo la variable como ESTADO
  // me produce un problema de Re-Renderización
  let itineraries;
  if (loading === false) {
    itineraries = flightOrder?.data?.data?.flightOffers[0].itineraries;
  }

  return (
    <React.Fragment>
      {loading ? (
        <MoonLoader />
      ) : (
        <Summary byRetrieving={true} itineraries={itineraries} />
      )}
    </React.Fragment>
  );
};

export default ItineraryScreen;
