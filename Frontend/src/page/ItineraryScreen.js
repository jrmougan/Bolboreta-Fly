import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Itinerary from '../components/StepperForm/Itinerary/Itinerary';
import { MoonLoader } from 'react-spinners';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 3rem auto;
  border-color: red;
`;

const ItineraryScreen = () => {
  const { idBooking } = useParams();

  const [loading, setLoading] = useState(true);
  const [flightOrder, setFlightOrder] = useState();
  const [flightDurations, setFlightDurations] = useState([]);
  const [flightCounter, setFlightCounter] = useState(0);

  const getBookingCode = async (id) => {
    var controller = new AbortController();
    var signal = controller.signal;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${id}/getIdFlightOrder`,
        { signal }
      );
      if (res.ok) {
        const body = await res.json();
        const data = body.data[0][0].booking_code;

        await getFlightOrderByBookingId(data);
      }
    } catch (error) {
      console.error('Falla en getBookingCode', error);
    } finally {
      controller.abort();
    }
  };

  const getFlightOrderByBookingId = async (id) => {
    var controller = new AbortController();
    var signal = controller.signal;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/retrieveBooking/${id}`,
        { signal }
      );
      if (res.ok) {
        const body = await res.json();
        setFlightOrder(body);
        setLoading(false);
      }
    } catch (error) {
      console.error('Falla cuando queremos el Flight Order', error);
    } finally {
      controller.abort();
    }
  };

  useEffect(() => {
    getBookingCode(idBooking);
  }, []);

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
        <MoonLoader className='rotator' css={override} />
      ) : (
        <Itinerary
          itineraries={itineraries}
          travelers={travelers}
          totalPrice={totalPrice}
          firstTraveler={firstTraveler}
          flightCounter={flightCounter}
          flightDurations={flightDurations}
          idBooking={idBooking}
        />
      )}
    </React.Fragment>
  );
};

export default ItineraryScreen;
