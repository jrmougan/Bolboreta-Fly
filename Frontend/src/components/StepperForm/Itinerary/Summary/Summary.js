import React, { useContext } from 'react';
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

const Summary = ({
  timeDep,
  timeArr,
  departureDate,
  arrivalDate,
  itineraries,
}) => {
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

  const { segments } = itineraries[0];

  const firstSegment = itineraries[0].segments[0];
  console.log('Segmento', firstSegment);

  const AirlineInfo = () => {
    const durationSegment = finalDurationFormat(firstSegment.duration);
    return (
      <div className='airline_info'>
        <AirlineLogo airlineCode={airlineCode} />
        <div className=''>
          <p className='bold'>{airlineName} - AF 1423</p>
          <span> Tipo de avión/vehículo: 318 - Clase Turista</span>
        </div>
        <div className='flight_duration_container'>
          <p className='flight_duration'>{durationSegment}</p>
        </div>
      </div>
    );
  };

  const firstIterableSegment = itineraries[0].segments;

  console.log('firstIterableSegment', firstIterableSegment);

  const ScaleSegment = ({ date1, date2 }) => {
    const dateFirst = new Date(date1);
    const dateSecond = new Date(date2);
    const diff = dateFirst - dateSecond;
    const result = durationFormat(diff);

    return (
      <div className='segment_scale'>
        <p>Pueden producirse cambios</p>
        <span>Duración de la escala: 'Todavía no solucionado'</span>
      </div>
    );
  };
  return (
    <article className='info_container'>
      <h1 className='title_info_container'>Itinerario: Vuelo</h1>
      <SubtitleInfo
        isRoundtrip={isOneWay}
        totalDuration={totalDuration_outbound}
      />
      <Confirmation>Vuelo confirmado</Confirmation>

      {firstIterableSegment.map((segment, key) => {
        // Códigos IATA de aeropuertos de salida y llegada
        const firstCode = segment.departure.iataCode;
        const secondCode = segment.arrival.iataCode;

        const firstTime = hourFormat(new Date(segment.departure.at));
        const secondTime = hourFormat(new Date(segment.arrival.at));

        const firstDate = dateFormat(new Date(segment.departure.at));
        const secondDate = dateFormat(new Date(segment.arrival.at));
        return (
          <section id='segments_container' key={key}>
            <div className='flightPart'>
              <div className='segment'>
                <AirportInfo
                  time={firstTime}
                  code={firstCode}
                  date={firstDate}
                />

                <AirlineInfo code={airlineCode} segment={firstSegment} />

                <AirportInfo
                  time={secondTime}
                  code={secondCode}
                  date={secondDate}
                />
              </div>
              <ScaleSegment />
            </div>
          </section>
        );
      })}
    </article>
  );
};

export default Summary;
