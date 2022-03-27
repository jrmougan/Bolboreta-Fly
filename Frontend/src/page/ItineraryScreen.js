import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Itinerary from "../components/StepperForm/Itinerary/Itinerary";
import { css } from "@emotion/react";

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
    console.log("getBookingCode", id);
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${id}/getIdFlightOrder`
      );
      if (res.ok) {
        const body = await res.json();
        const data = body.data[0][0].booking_code;

        await getFlightOrderByBookingId(data);
      }
    } catch (error) {
      console.error("Falla en getBookingCode", error);
    }
  };

  const getFlightOrderByBookingId = async (id) => {
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/retrieveBooking/${id}`
      );
      if (res.ok) {
        const body = await res.json();
        setFlightOrder(body);
        setLoading(false);
      }
    } catch (error) {
      console.error("Falla cuando queremos el Flight Order", error);
    }
  };

  useEffect(() => {
    getBookingCode(idBooking);
  }, []);

  /* 
  ############################
  ##  OBTENER IDS DE VUELOS ##
  ############################
  */

  const getAllFlightIds = async () => {
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${idBooking}/getFlightsIds`
      );

      if (res.ok) {
        const body = await res.json();
        const durations = body.data[0];
        console.log("Todos los Ids de los vuelos", body);
        setFlightDurations([...flightDurations, durations]);
      }
    } catch (error) {
      console.error("Error en AllFlights", error);
    }
  };
  console.log("Objeto con duraciones", flightDurations);
  useEffect(() => {
    getAllFlightIds();
  }, [flightOrder]);

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
        <MoonLoader className="rotator" css={override} />
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
