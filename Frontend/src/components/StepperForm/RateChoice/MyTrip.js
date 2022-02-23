import React from 'react';
import '../style.css';
import offerprice from '../InfoFlights/offerpriceExample.json';
import { dateFormat, writeDuration } from '../../../helpers/formatHelp';
import { hourFormat } from '../../../helpers/formatHelp';
import airports from '../InfoFlights/airports.json';

const flightOffer = offerprice.data.flightOffers[0];

const adultsFlightoffer = Number(flightOffer.travelerPricings.length);
const howManyAdults =
  adultsFlightoffer === 1 ? '1 adulto' : `${adultsFlightoffer} adultos`;
const oneWay = flightOffer.itineraries.length === 1;
const isOneWay = oneWay ? 'Ida' : '(Ida y vuelta)';
console.log(oneWay);

// Encontramos el último vuelo de los segmentos de Ida y Vuelta

const lastSegmentOutbound =
  Number(flightOffer.itineraries[0].segments.length) - 1;
const lastSegmentRoundtrip =
  Number(flightOffer.itineraries[1].segments.length) - 1;

/* 
#############################
## CIU  DADES Y AEROPUERTOS  ##
#############################
*/
const codeAirportDeparture_Outbound =
  flightOffer.itineraries[0].segments[0].departure.iataCode;

const codeAirportArrival_Outbound =
  flightOffer.itineraries[0].segments[lastSegmentOutbound].arrival.iataCode;

function airportFinding(code) {
  const airportFinded = airports.find((airport) => airport.code === code);
  const location = airportFinded.location.split(',')[0];
  return location;
}

/* Ciudades IDA */
const cityDeparture_Outbound = airportFinding(codeAirportDeparture_Outbound);
const cityArrival_Outbound = airportFinding(codeAirportArrival_Outbound);

const MyTrip = () => {
  return (
    <div className='my-trip'>
      <h2>Mi viaje</h2>

      <h3>
        {cityDeparture_Outbound} - {cityArrival_Outbound} {isOneWay} <br />{' '}
        {howManyAdults}
      </h3>
      <FlightBoxes>{offerprice}</FlightBoxes>
    </div>
  );
};

const FlightBoxes = ({ children }) => {
  const flightOffer = children.data.flightOffers[0];

  /* 
############
## FECHAS ##
############
*/

  const outboundFirstDay = flightOffer.itineraries[0].segments[0].departure.at;
  const roundtripFirstDay = flightOffer.itineraries[1].segments[0].departure.at;

  const outboundFirstDayFormatted = dateFormat(outboundFirstDay);
  const roundtripFirstDayFormatted = dateFormat(roundtripFirstDay);

  // Encontramos el último vuelo de los segmentos de Ida y Vuelta

  const lastSegmentOutbound =
    Number(flightOffer.itineraries[0].segments.length) - 1;
  const lastSegmentRoundtrip =
    Number(flightOffer.itineraries[1].segments.length) - 1;

  // Último vuelo de ida, hora de llegada
  const outboundLastArrival =
    flightOffer.itineraries[0].segments[lastSegmentOutbound].arrival.at;

  // Último vuelo de vuelta, hora de llegada
  const roundtripLastArrival =
    flightOffer.itineraries[1].segments[lastSegmentRoundtrip].arrival.at;

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
  const codeAirportDeparture_Outbound =
    flightOffer.itineraries[0].segments[0].departure.iataCode;

  const codeAirportArrival_Outbound =
    flightOffer.itineraries[0].segments[lastSegmentOutbound].arrival.iataCode;

  const codeAirportDeparture_Roundtrip =
    flightOffer.itineraries[1].segments[0].departure.iataCode;

  const codeAirportArrival_Roundtrip =
    flightOffer.itineraries[1].segments[lastSegmentRoundtrip].arrival.iataCode;

  function airportFinding(code) {
    const airportFinded = airports.find((airport) => airport.code === code);
    const location = airportFinded.location.split(',')[0];
    return location;
  }

  /* Ciudades IDA */
  const cityDeparture_Outbound = airportFinding(codeAirportDeparture_Outbound);
  const cityArrival_Outbound = airportFinding(codeAirportArrival_Outbound);

  /* Ciudades VUELTA */
  const cityDeparture_Roundtrip = airportFinding(
    codeAirportDeparture_Roundtrip
  );
  const cityArrival_Roundtrip = airportFinding(codeAirportArrival_Roundtrip);

  console.log(flightOffer);

  return (
    <section>
      <div className='box-flight'>
        <h4> Ida </h4>
        <span className='date-flight'> {outboundFirstDayFormatted}</span>
        <div className='schedule-box'>
          <div className='departure-box'>
            <p>Salida</p>
            <div className='departure-schedule'>
              <p>{outboundDepartureTimeFirst}</p>
              <p>{cityDeparture_Outbound}</p>
            </div>
          </div>
          <div className='arrival-box'>
            <p>Llegada</p>
            <div className='arrival-schedule'>
              <p>{timeOutboundLastArrival}</p>
              <p>{cityArrival_Outbound}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='box-flight'>
        <h4> Vuelta </h4>
        <span className='date-flight'> {roundtripFirstDayFormatted}</span>
        <div className='schedule-box'>
          <div className='departure-box'>
            <p>Salida</p>
            <div className='departure-schedule'>
              <p>{roundtripDepartureTimeFirst}</p>
              <p>{cityDeparture_Roundtrip}</p>
            </div>
          </div>
          <div className='arrival-box'>
            <p>Llegada</p>
            <div className='arrival-schedule'>
              <p>{roundtripArrivalLastTime}</p>
              <p>{cityArrival_Roundtrip}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTrip;
