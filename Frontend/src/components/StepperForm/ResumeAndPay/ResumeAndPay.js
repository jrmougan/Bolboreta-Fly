import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../../context/TokenContext";
import PaymentElection from "./PaymentElection";
import { OfferPriceContext } from "../../../context/OfferPriceContext";
import FinalAcounting from "./FinalAcounting";
import FlightsResume from "./FlightsResume/FlightsResume";

const ResumeandPay = ({ rateCharge, travelers, totalPrice }) => {
  // Contextos
  const [token] = useContext(TokenContext);
  const [flight, setFlight] = useContext(OfferPriceContext);
  console.log(travelers);

  const offerPrice = async (flightOffer) => {
    const body = {
      data: {
        type: "flight-offers-pricing",
        flightOffers: [flightOffer],
      },
    };
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/pricing`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log(data.data.data.flightOffers[0]);
        setFlight(data.data.data.flightOffers[0]);
      }
    } catch (error) {
      console.error(error);
    }

    return offerPrice;
  };

  // Itinerarios de vuelo
  const { itineraries } = flight;

  //  Averiguamos el código de la aerolínea principal
  const airlineCode = flight.validatingAirlineCodes[0];

  const flightOrder = {
    itinerary: flight,
    travelers: travelers,
  };
  console.log(flightOrder);

  // Petición Order Flight

  useEffect(() => {
    console.log("EFECTOooOO");
    console.log("fdsafads");
  }, [flight]);

  const orderFlight = async (e) => {
    e.preventDefault();
    await offerPrice(flight);
    console.log(flightOrder);
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/newBooking`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightOrder),
        }
      );

      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="paymentConfirmationContainer">
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
  return <div className="paymentConfirmation">{children}</div>;
};
export default ResumeandPay;
