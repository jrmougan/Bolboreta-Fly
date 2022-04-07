import React, { useContext } from "react";
import { TokenContext } from "../../../context/TokenContext";
import PaymentElection from "./PaymentElection";
import { OfferPriceContext } from "../../../context/OfferPriceContext";
import FinalAcounting from "./FinalAcounting";
import FlightsResume from "./FlightsResume/FlightsResume";
import swal from "sweetalert";

const offerPrice = async (flightOffer, token, travelers, bookingData) => {
  const body = {
    data: {
      type: "flight-offers-pricing",
      flightOffers: [flightOffer],
    },
  };
  let updatedOffer;
  try {
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/pricing`,
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
      updatedOffer = await data.data.data.flightOffers[0];

      const insertId = await bookOffer(
        updatedOffer,
        token,
        travelers,
        bookingData
      );
      if (!isNaN(insertId)) {
        return await insertId;
      } else {
        return "error";
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const bookOffer = async (updatedFlightOrder, token, travelers, bookingData) => {
  const flightOrder = {
    itinerary: updatedFlightOrder,
    travelers: travelers,
    bookingData: bookingData,
  };
  try {
    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/newBooking`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flightOrder),
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data.data;
    } else {
      return "error";
    }
  } catch (error) {
    swal("No se ha podido realizar la reserva", " ", "error");
  }
};

const ResumeandPay = ({ rateCharge, travelers, totalPrice, bookingData }) => {
  // Contextos

  const [token] = useContext(TokenContext);
  const [flight, setFlight] = useContext(OfferPriceContext);

  // Itinerarios de vuelo
  const { itineraries } = flight;

  //  Averiguamos el código de la aerolínea principal
  const airlineCode = flight.validatingAirlineCodes[0];

  return (
    <section className="paymentConfirmationContainer">
      <PaymentElection
        totalPrice={totalPrice}
        orderFlight={offerPrice}
        travelers={travelers}
        bookingData={bookingData}
      />

      <PaymentConfirmation>
        <FlightsResume itineraries={itineraries} airlineCode={airlineCode} />
        <FinalAcounting flight={flight} />
      </PaymentConfirmation>
    </section>
  );
};
const PaymentConfirmation = ({ children }) => {
  return <div className="paymentConfirmation">{children}</div>;
};
export default ResumeandPay;
