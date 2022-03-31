import React, { useContext } from 'react';
import '../style.css';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import { findAirportInfo } from '../InfoFlights/helpersFlight';
import FlightBox from './FlightBox';
import TitleTrip from './TitleTrip';

const MyTrip = ({ isReturn }) => {
  // Conseguimos el vuelo seleccionado a través del contexto
  const [flights] = useContext(OfferPriceContext);

  /* 
  ##################################
  ## INFORMACIÓN BÁSICA DEL VUELO ##
  ##################################
  */

  // ¿Cuántos adultos?
  const adults = Number(flights.travelerPricings.length);
  const howManyAdults = adults === 1 ? '1 adulto' : `${adults} adultos`;

  // ¿Sólo ida?
  const oneWay = flights.itineraries.length === 1;
  const isOneWay = oneWay ? 'Sólo Ida' : 'Ida y vuelta';

  // Encontramos en el array de los vuelos de IDA
  //  la posición del último vuelo
  const lastSegmentOutbound =
    Number(flights.itineraries[0].segments.length) - 1;

  /* 
  #############################
  ## CIUDADES Y AEROPUERTOS  ##
  #############################
  */

  // Códigos iata del primer aeropuerto de salida
  // y del último de llegada en la IDA
  const iataFirstDeparture_outbound =
    flights.itineraries[0].segments[0].departure.iataCode;
  const iataLastArrival_outbound =
    flights.itineraries[0].segments[lastSegmentOutbound].arrival.iataCode;

  /* Ciudades IDA */
  const cityDeparture_Outbound = findAirportInfo(
    iataFirstDeparture_outbound,
    'city'
  );
  const cityArrival_Outbound = findAirportInfo(
    iataLastArrival_outbound,
    'city'
  );

  return (
    <div className='my-trip'>
      <h2>Mi viaje</h2>

      <TitleTrip
        cityDeparture={cityDeparture_Outbound}
        cityArrival={cityArrival_Outbound}
        isOneWay={isOneWay}
        howManyAdults={howManyAdults}
      />

      <FlightBoxes isReturn={isReturn} isOneWay={isOneWay}>
        {flights}
      </FlightBoxes>
    </div>
  );
};

const FlightBoxes = ({ children, oneWay, isReturn }) => {
  // Obtenemos el vuelo a través del children
  const flight = children;

  const outboundItinerary = flight.itineraries[0];
  let roundtripItinerary;
  if (isReturn) {
    roundtripItinerary = flight.itineraries[1];
  }

  return (
    <section>
      <FlightBox itinerary={outboundItinerary} isReturn={false} />

      {isReturn && <FlightBox itinerary={roundtripItinerary} isReturn={true} />}
    </section>
  );
};

export default MyTrip;
