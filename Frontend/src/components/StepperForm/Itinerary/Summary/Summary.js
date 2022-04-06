import { parse, toSeconds } from 'iso8601-duration';
import React, { useEffect, useState } from 'react';
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

export const InfoContainer = ({ segments, isReturn, idBooking }) => {
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
  let totalDuration = durationFormat(itineraryDurationToFormat);

  const getDurationByNumberAndBooking = async (idBooking, number) => {
    var controller = new AbortController();
    var signal = controller.signal;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PUBLIC_PROTOCOL}://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/flight/${idBooking}/${number}`,
        { signal }
      );
      if (res.ok) {
        const body = await res.json();
        const durationSegment = body.data[0][0].duration;
        return body.data[0][0].duration;
      }
    } catch (error) {
    } finally {
      controller.abort();
    }
  };

  const [itineraryDuration, setItineraryDuration] = useState(0);

  useEffect(() => {
    let mapTotalDuration = 0;
    segments.map((segment, key, itinerary) => {
      getDurationByNumberAndBooking(idBooking, segment.number).then(
        (duration) => {
          const dur = toSeconds(parse(duration)) * 1000;

          mapTotalDuration += dur;
          if (key > 0) {
            const ultimaLlegada = new Date(
              itinerary[key - 1].arrival.at
            ).getTime();
            const siguienteSalida = new Date(segment.departure.at).getTime();
            const diferencia = siguienteSalida - ultimaLlegada;
            mapTotalDuration += diferencia;
          }
          setItineraryDuration(mapTotalDuration);
        }
      );
    });
  }, [segments]);

  return (
    <article className='info_container'>
      <h1 className='title_info_container'>Itinerario: Vuelo</h1>
      <SubtitleInfo isRoundtrip={isReturn} totalDuration={itineraryDuration} />
      <Confirmation>Vuelo confirmado</Confirmation>

      {segments.map((segment, key, itinerary) => {
        let scaleDuration;
        if (key > 0) {
          const ultimaLlegada = new Date(
            itinerary[key - 1].arrival.at
          ).getTime();
          const siguienteSalida = new Date(segment.departure.at).getTime();
          scaleDuration = durationFormat(siguienteSalida - ultimaLlegada);
        }

        return (
          <section id='segments_container' key={key}>
            <div className='flightPart'>
              {key - 1 >= 0 && <ScaleSegment duration={scaleDuration} />}
              <Segment
                segment={segment}
                idBooking={idBooking}
                itineraryDuration={100}
              />
            </div>
          </section>
        );
      })}
    </article>
  );
};
const Segment = ({ segment, idBooking, itineraryDuration }) => {
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
        itineraryDuration={itineraryDuration}
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
