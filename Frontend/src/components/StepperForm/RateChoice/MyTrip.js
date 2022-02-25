import React, { useContext } from 'react';
import '../style.css';
import { dateFormat, hourFormat } from '../../../helpers/formatHelp';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import { findAirportInfo } from '../InfoFlights/helpersFlight';
import FlightBox from './FlightBox';
import TitleTrip from './TitleTrip';

const MyTrip = () => {
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

      <FlightBoxes isOneWay={isOneWay}>{flights}</FlightBoxes>
    </div>
  );
};

const FlightBoxes = ({ children, oneWay }) => {
  // Obtenemos el vuelo a través del children
  const flight = children;

  /* 
  ############
  ## FECHAS ##
  ############
  */

  const outboundFirstDay = flight.itineraries[0].segments[0].departure.at;
  const roundtripFirstDay = flight.itineraries[1].segments[0].departure.at;

  const outboundFirstDayFormatted = dateFormat(outboundFirstDay);
  const roundtripFirstDayFormatted = dateFormat(roundtripFirstDay);

  // Encontramos el último vuelo de los segmentos de Ida y Vuelta

  const lastSegmentOutbound = Number(flight.itineraries[0].segments.length) - 1;
  const lastSegmentRoundtrip =
    Number(flight.itineraries[1].segments.length) - 1;

  // Último vuelo de ida, hora de llegada
  const outboundLastArrival =
    flight.itineraries[0].segments[lastSegmentOutbound].arrival.at;

  // Último vuelo de vuelta, hora de llegada
  const roundtripLastArrival =
    flight.itineraries[1].segments[lastSegmentRoundtrip].arrival.at;

  /* 
  ############
  ## HORAS  ##
  ############
  */

  const timeOutboundLastArrival = hourFormat(new Date(outboundLastArrival));
  const roundtripArrivalLastTime = hourFormat(new Date(roundtripLastArrival));

  const outboundDepartureTimeFirst = hourFormat(new Date(outboundFirstDay));
  const roundtripDepartureTimeFirst = hourFormat(new Date(roundtripFirstDay));

  /* 
  #############################
  ## CUIDADES Y AEROPUERTOS  ##
  #############################
  */

  // IDA => Códigos IATA
  const codeAirportDeparture_Outbound =
    flight.itineraries[0].segments[0].departure.iataCode;

  const codeAirportArrival_Outbound =
    flight.itineraries[0].segments[lastSegmentOutbound].arrival.iataCode;

  // VUELTA => Códigos IATA
  const codeAirportDeparture_Roundtrip =
    flight.itineraries[1].segments[0].departure.iataCode;

  const codeAirportArrival_Roundtrip =
    flight.itineraries[1].segments[lastSegmentRoundtrip].arrival.iataCode;

  /* Ciudades IDA */
  const cityDeparture_Outbound = findAirportInfo(
    codeAirportDeparture_Outbound,
    'city'
  );
  const cityArrival_Outbound = findAirportInfo(
    codeAirportArrival_Outbound,
    'city'
  );

  /* Ciudades VUELTA */
  const cityDeparture_Roundtrip = findAirportInfo(
    codeAirportDeparture_Roundtrip,
    'city'
  );
  const cityArrival_Roundtrip = findAirportInfo(
    codeAirportArrival_Roundtrip,
    'city'
  );

  return (
    <section>
      <FlightBox
        dayDeparture={outboundFirstDayFormatted}
        timeDeparture={outboundDepartureTimeFirst}
        timeArrival={timeOutboundLastArrival}
        cityDeparture={cityDeparture_Outbound}
        cityArrival={cityArrival_Outbound}
        outbound={true}
      />

      {!oneWay && (
        <FlightBox
          dayDeparture={roundtripFirstDayFormatted}
          timeDeparture={roundtripDepartureTimeFirst}
          timeArrival={roundtripArrivalLastTime}
          cityDeparture={cityDeparture_Roundtrip}
          cityArrival={cityArrival_Roundtrip}
          outbound={false}
        />
      )}
    </section>
  );
};

export default MyTrip;
