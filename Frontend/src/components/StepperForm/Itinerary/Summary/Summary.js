import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { duration } from '@mui/material';
import React, { useContext, useState } from 'react';
import { OfferPriceContext } from '../../../../context/OfferPriceContext';
import {
  dateFormat,
  durationFormat,
  finalDurationFormat,
  hourFormat,
} from '../../../../helpers/formatHelp';
import { AirlineLogo, findAirlineName } from '../../InfoFlights/helpersFlight';

import AirportInfo from './AirportInfo';
import Confirmation from './Confirmation';
import SubtitleInfo from './SubtitleInfo';

const Summary = ({ itineraries }) => {
  const [flights] = useContext(OfferPriceContext);
  // ¿Sólo ida?
  const oneWay = itineraries.length === 1;
  const isOneWay = oneWay ? 'Sólo Ida' : 'Ida y vuelta';

  // Duración total vuelo IDA
  const totalDuration_outbound = finalDurationFormat(itineraries[0].duration);
  // Duración total vuelo VUELTA
  const totalDuration_roundtrip = finalDurationFormat(itineraries[1].duration);

  //  Averiguamos el código de la aerolínea
  // y mostramos su logo en pantalla
  const airlineCode = flights.validatingAirlineCodes[0];
  const airlineName = findAirlineName(airlineCode);
  //   const airlineNumber = findFlightNumber(flights);

  /* 
  ###################
  ## INFO AIRLINES ##
  ###################
  */

  const segments_outbound = itineraries[0].segments;
  const segments_roundtrip = itineraries[1].segments;

  /* 
  ##############################
  ## MISIÓN AVERGIAUR ESCALAS ##
  ##############################
  */

  let lastArrival;
  let nextDeparture;

  let vuelos = -1;
  let vuelos2 = -1;

  let duracionEscala1;
  let duracionEscala2;
  return (
    <React.Fragment>
      <article className='info_container'>
        <h1 className='title_info_container'>Itinerario: Vuelo</h1>
        <SubtitleInfo
          isRoundtrip={isOneWay}
          totalDuration={totalDuration_outbound}
        />
        <Confirmation>Vuelo confirmado</Confirmation>

        {segments_outbound.map((segment, key) => {
          const ultimaLlegada = new Date(segment.arrival.at);
          const siguienteSalida = new Date(segment.departure.at);

          vuelos++;

          if (vuelos > 0) {
            nextDeparture = siguienteSalida;

            let durationScale = nextDeparture.getTime() - lastArrival.getTime();

            duracionEscala1 = durationFormat(durationScale);
          }
          //  Recogemos la primera llegada antes que cualquier variable
          lastArrival = ultimaLlegada;

          return (
            <section id='segments_container' key={key}>
              <div className='flightPart'>
                {vuelos > 0 && <ScaleSegment duration={duracionEscala1} />}
                <Segment
                  segment={segment}
                  scaleDuration={duracionEscala1}
                  airlineCode={airlineCode}
                  airlineName={airlineName}
                />
              </div>
            </section>
          );
        })}
      </article>
      <article className='info_container'>
        <h1 className='title_info_container'>Itinerario: Vuelo</h1>
        <SubtitleInfo
          isRoundtrip={isOneWay}
          totalDuration={totalDuration_outbound}
        />
        <Confirmation>Vuelo confirmado</Confirmation>

        {segments_roundtrip.map((segment, key) => {
          const ultimaLlegada = new Date(segment.arrival.at);
          const siguienteSalida = new Date(segment.departure.at);

          vuelos2++;

          if (vuelos2 > 0) {
            nextDeparture = siguienteSalida;

            let durationScale = nextDeparture.getTime() - lastArrival.getTime();

            duracionEscala2 = durationFormat(durationScale);
          }
          //  Recogemos la primera llegada antes que cualquier variable
          lastArrival = ultimaLlegada;

          return (
            <section id='segments_container' key={key}>
              <div className='flightPart'>
                {vuelos2 > 0 && <ScaleSegment duration={duracionEscala2} />}
                <Segment
                  segment={segment}
                  airlineCode={airlineCode}
                  airlineName={airlineName}
                />
              </div>
            </section>
          );
        })}
      </article>
    </React.Fragment>
  );
};
const Segment = ({ segment, scaleDuration, airlineCode, airlineName }) => {
  // Códigos IATA de aeropuertos de salida y llegada
  const firstCode = segment.departure.iataCode;
  const secondCode = segment.arrival.iataCode;

  const firstTime = hourFormat(new Date(segment.departure.at));
  const secondTime = hourFormat(new Date(segment.arrival.at));

  const firstDate = dateFormat(new Date(segment.departure.at));
  const secondDate = dateFormat(new Date(segment.arrival.at));

  return (
    <div className='segment'>
      <AirportInfo time={firstTime} code={firstCode} date={firstDate} />

      <AirlineInfo code={airlineCode} segment={segment} name={airlineName} />

      <AirportInfo time={secondTime} code={secondCode} date={secondDate} />
    </div>
  );
};
const ScaleSegment = ({ duration }) => {
  return (
    <div className='segment_scale'>
      <p>Pueden producirse cambios</p>
      <span>Duración de la escala: {duration}</span>
    </div>
  );
};
const AirlineInfo = ({ segment, code, name }) => {
  const durationSegment = finalDurationFormat(segment.duration);
  return (
    <div className='airline_info'>
      <AirlineLogo airlineCode={code} />
      <div className=''>
        <p className='bold'>{name} - AF 1423</p>
        <span> Tipo de avión/vehículo: 318 - Clase Turista</span>
      </div>
      <div className='flight_duration_container'>
        <p className='flight_duration'>{durationSegment}</p>
      </div>
    </div>
  );
};

export default Summary;
