import React, { useContext } from 'react';
import { TokenContext } from '../../../context/TokenContext';
import PaymentElection from './PaymentElection';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import FinalAcounting from './FinalAcounting';
import FlightsResume from './FlightsResume/FlightsResume';

const ResumeandPay = ({ rateCharge, travelers }) => {
  // Contextos
  const [token] = useContext(TokenContext);
  const [flight] = useContext(OfferPriceContext);

  // Itinerarios de vuelo
  const { itineraries } = flight;

  //  Averiguamos el código de la aerolínea principal
  const airlineCode = flight.validatingAirlineCodes[0];

  // Petición Order Flight
  const orderFlight = async (e) => {
    const flightOrder = {
      itinerary: itineraries,
      travelers: travelers,
    };
    e.preventDefault();

    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/newBooking`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: flightOrder,
      }
    );
    console.log(res);
  };

  return (
    <section className='paymentConfirmationContainer'>
      <PaymentElection />

      <PaymentConfirmation>
        <FlightsResume itineraries={itineraries} airlineCode={airlineCode} />
        <FinalAcounting
          flight={flight}
          rateCharge={rateCharge}
          orderFlight={orderFlight}
        />
      </PaymentConfirmation>
    </section>
  );
};
const PaymentConfirmation = ({ children }) => {
  return <div className='paymentConfirmation'>{children}</div>;
};
export default ResumeandPay;
