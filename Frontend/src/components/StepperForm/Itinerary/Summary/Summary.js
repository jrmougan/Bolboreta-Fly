import React from 'react';
import {
  dateFormat,
  durationFormat,
  finalDurationFormat,
  hourFormat,
} from '../../../../helpers/formatHelp';
import AirlineInfo from './AirlineInfo';

import AirportInfo from './AirportInfo';
import Confirmation from './Confirmation';
import SubtitleInfo from './SubtitleInfo';

const Summary = ({ itineraries }) => {
  // ¿Sólo ida?
  const isReturn = itineraries.length > 1;
  const title = isReturn ? 'Ida y vuelta' : 'Solo ida';

  // Duración total vuelo IDA
  const totalDuration_outbound = finalDurationFormat(itineraries[0].duration);

  let totalDuration_roundtrip;
  // Duración total vuelo VUELTA
  if (isReturn) {
    totalDuration_roundtrip = finalDurationFormat(itineraries[1].duration);
  }

  /* 
  ###################
  ## INFO AIRLINES ##
  ###################
  */

  const segments_outbound = itineraries[0].segments;
  let segments_roundtrip;

  if (isReturn) {
    segments_roundtrip = itineraries[1].segments;
  }

  return (
    <React.Fragment>
      <InfoContainer
        isOneWay={title}
        totalDuration_roundtrip={totalDuration_outbound}
      >
        {segments_outbound}
      </InfoContainer>

      {isReturn && (
        <InfoContainer
          isOneWay={title}
          totalDuration_roundtrip={totalDuration_roundtrip}
        >
          {segments_roundtrip}
        </InfoContainer>
      )}
    </React.Fragment>
  );
};

const InfoContainer = ({ children, totalDuration_roundtrip, isReturn }) => {
  let lastArrival;
  let nextDeparture;
  let vuelos2 = -1;
  let duracionEscala2;
  return (
    <article className='info_container'>
      <h1 className='title_info_container'>Itinerario: Vuelo</h1>
      <SubtitleInfo
        isRoundtrip={isReturn}
        totalDuration={totalDuration_roundtrip}
      />
      <Confirmation>Vuelo confirmado</Confirmation>

      {children.map((segment, key) => {
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
              <Segment segment={segment} />
            </div>
          </section>
        );
      })}
    </article>
  );
};
const Segment = ({ segment }) => {
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

      <AirlineInfo segment={segment} />

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

export default Summary;
