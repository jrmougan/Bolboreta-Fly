import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { tripIncludes } from '../components/StepperForm/InfoFlights/constantInfo';
import ContactInfo from '../components/StepperForm/Itinerary/ContactInfo';
import InTripIncluded from '../components/StepperForm/Itinerary/InTripIncluded';
import Itinerary from '../components/StepperForm/Itinerary/Itinerary';
import SeatAndBaggage from '../components/StepperForm/Itinerary/SeatAndBaggage';
import Summary from '../components/StepperForm/Itinerary/Summary/Summary';
import useGetFlightOrder from '../hooks/useGetFlightOrder';

const ItineraryScreen = () => {
  // const bookingCode = 'eJzTd9f3DgoMCfYCAAu9AoU%3D';

  const { bookingId } = useParams();

  console.log(bookingId);

  const [flightOrder, loading] = useGetFlightOrder(bookingId);
  console.log('Flight Order', flightOrder);

  // Si pongo la variable como ESTADO
  // me produce un problema de Re-Renderización
  let itineraries;
  let travelers;
  if (loading === false) {
    itineraries = flightOrder.data.data.flightOffers[0].itineraries;
    travelers = flightOrder.data.data.travelers;
  }

  return (
    <React.Fragment>
      {loading ? (
        <MoonLoader />
      ) : (
        <React.Fragment>
          <Summary byRetrieving={true} itineraries={itineraries} />

          <SeatAndBaggage
            seatChosen={0}
            superPassenger={null}
            travelers={travelers}
          />
          <InTripIncluded tripIncludes={tripIncludes} />
          {/* <ContactInfo /> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ItineraryScreen;
