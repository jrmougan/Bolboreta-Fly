import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import Itinerary from '../StepperForm/Itinerary/Itinerary';

const ItineraryScreen2 = () => {
  const { idBooking } = useParams();

  const [loading, setLoading] = useState(true);
  const [bookingCode, setBookingCode] = useState(1);
  const [flightOrder, setFlightOrder] = useState();

  const getBookingCode = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/booking/${id}/getIdFlightOrder`
      );
      if (res.ok) {
        const body = await res.json();
        const data = body.data[0][0].booking_code;
        setBookingCode(data);
        console.log('Codigo 1', data);
      }
    } catch (error) {
      console.error('Falla en getBookingCode', error);
    }
  };

  const getFlightOrderByBookingId = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/booking/retrieveBooking/${bookingCode}`
      );
      if (res.ok) {
        const body = await res.json();
        setFlightOrder(body);
        setLoading(false);
        console.log('Flight Order', body);
      }
    } catch (error) {
      console.error('Falla cuando queremos el Flight Order', error);
    }
  };

  useEffect(() => {
    getFlightOrderByBookingId();
  }, [bookingCode]);

  useEffect(() => {
    getBookingCode(idBooking);
  }, []);

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
        />
      )}
    </React.Fragment>
  );
};

export default ItineraryScreen2;