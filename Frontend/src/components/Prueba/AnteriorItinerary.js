import React from 'react';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Itinerary from '../StepperForm/Itinerary/Itinerary';
import useGetFlightOrder from '../../hooks/useGetFlightOrder';

const PeviousItineraryScreen = () => {
  const { bookingId } = useParams();

  const getBookingCodeByBookingId = async (bookingId) => {
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${bookingId}`
      );

      if (res.ok) {
        const body = await res.json();
        console.log('Body', body);
      }
    } catch (error) {
      console.error('Ha habido un error', error);
    }
  };

  const [flightOrder, loading] = useGetFlightOrder(bookingId);

  // Si pongo la variable como ESTADO
  // me produce un problema de Re-Renderización
  let itineraries;
  let travelers;
  let firstTraveler;
  let totalPrice;
  let contacts;
  if (loading === false) {
    itineraries = flightOrder.data.data.flightOffers[0].itineraries;
    travelers = flightOrder.data.data.travelers;
    firstTraveler = travelers[0];
    totalPrice = flightOrder.data.data.flightOffers[0].price.total;
    contacts = flightOrder.data.data.contacts;

    console.log('CONTACTS', contacts[0]);
  }

  return (
    <React.Fragment>
      {loading ? (
        <MoonLoader />
      ) : (
        <Itinerary
          itineraries={itineraries}
          travelers={travelers}
          totalPrice={totalPrice}
          firstTraveler={firstTraveler}
          getBookingCodeByBookingId={getBookingCodeByBookingId}
        />
      )}
    </React.Fragment>
  );
};

export default PeviousItineraryScreen;
