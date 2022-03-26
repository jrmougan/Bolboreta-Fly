import React from 'react';
import {
  dateFormat,
  durationFormat,
  hourFormat,
} from '../../../../helpers/formatHelp';
import AirlineInfo from './AirlineInfo';
import AirportInfo from './AirportInfo';
import Confirmation from './Confirmation';
import SubtitleInfo from './SubtitleInfo';

const Summary = ({
  itineraries,
  flightDurations,
  flightCounter,
  idBooking,
}) => {
  // ¿Sólo ida?
  const isReturn = itineraries.length > 1;
  const title = isReturn ? 'Ida y vuelta' : 'Solo ida';

  // Itinerarios
  let secondItinerary;
  const firstItinerary = itineraries[0];
  if (isReturn) {
    secondItinerary = itineraries[1];
  }

  return (
    <React.Fragment>
      <InfoContainer
        isOneWay={title}
        segments={firstItinerary.segments}
        flightDurations={flightDurations}
        flightCounter={flightCounter}
        idBooking={idBooking}
      />

      {isReturn && (
        <InfoContainer
          isReturn={isReturn}
          segments={secondItinerary.segments}
          flightDurations={flightDurations}
          flightCounter={flightCounter}
          idBooking={idBooking}
        />
      )}
    </React.Fragment>
  );
};

export const InfoContainer = ({
  segments,
  isReturn,
  flightDurations,
  flightCounter,
  idBooking,
}) => {
  console.log('FlightDuration', flightDurations);
  /* 
  ###############
  ## DURATIONS ##
  ###############
  */
  const firstItineraryDeparture = new Date(segments[0].departure.at).getTime();
  const lastSegment = segments.length - 1;
  const lastArrivalItinerary = new Date(
    segments[lastSegment].arrival.at
  ).getTime();

  const itineraryDurationToFormat =
    lastArrivalItinerary - firstItineraryDeparture;
  const totalDuration = durationFormat(itineraryDurationToFormat);

  // Variables para calcular las escalas
  let lastArrival;
  let nextDeparture;
  let vuelos = -1;
  let scaleDuration;
  return (
    <article className='info_container'>
      <h1 className='title_info_container'>Itinerario: Vuelo</h1>
      <SubtitleInfo isRoundtrip={isReturn} totalDuration={totalDuration} />
      <Confirmation>Vuelo confirmado</Confirmation>

      {segments.map((segment, key) => {
        const ultimaLlegada = new Date(segment.arrival.at);
        const siguienteSalida = new Date(segment.departure.at);

        vuelos++;

        if (vuelos > 0) {
          nextDeparture = siguienteSalida;

          let durationScale = nextDeparture.getTime() - lastArrival.getTime();

          scaleDuration = durationFormat(durationScale);
        }
        //  Recogemos la primera llegada antes que cualquier variable
        lastArrival = ultimaLlegada;

        return (
          <section id='segments_container' key={key}>
            <div className='flightPart'>
              {vuelos > 0 && <ScaleSegment duration={scaleDuration} />}
              <Segment segment={segment} idBooking={idBooking} />
            </div>
          </section>
        );
      })}
    </article>
  );
};
const Segment = ({ segment, idBooking }) => {
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

      <AirlineInfo
        segment={segment}
        byRetrieving={true}
        idBooking={idBooking}
      />

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
