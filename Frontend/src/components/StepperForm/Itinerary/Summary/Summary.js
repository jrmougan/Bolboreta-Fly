import React, { useState } from "react";
import {
  dateFormat,
  durationFormat,
  hourFormat,
} from "../../../../helpers/formatHelp";
import AirlineInfo from "./AirlineInfo";
import AirportInfo from "./AirportInfo";
import Confirmation from "./Confirmation";
import SubtitleInfo from "./SubtitleInfo";

const Summary = ({
  itineraries,
  flightDurations,
  flightCounter,
  idBooking,
}) => {
  // ¿Sólo ida?
  const isReturn = itineraries.length > 1;
  const title = isReturn ? "Ida y vuelta" : "Solo ida";

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

  return (
    <article className="info_container">
      <h1 className="title_info_container">Itinerario: Vuelo</h1>
      <SubtitleInfo isRoundtrip={isReturn} totalDuration={100} />
      <Confirmation>Vuelo confirmado</Confirmation>

      {segments.map((segment, key, itinerary) => {
        let scaleDuration;
        if (key > 0) {
          const ultimaLlegada = new Date(
            itinerary[key - 1].arrival.at
          ).getTime();
          const siguienteSalida = new Date(segment.departure.at).getTime();
          scaleDuration = durationFormat(siguienteSalida - ultimaLlegada);
          console.log(scaleDuration);
        }

        return (
          <section id="segments_container" key={key}>
            <div className="flightPart">
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
const Segment = ({
  segment,
  idBooking,
  setItineraryDuration,
  itineraryDuration,
}) => {
  // Códigos IATA de aeropuertos de salida y llegada
  const firstCode = segment.departure.iataCode;
  const secondCode = segment.arrival.iataCode;

  const firstTime = hourFormat(new Date(segment.departure.at));
  const secondTime = hourFormat(new Date(segment.arrival.at));

  const firstDate = dateFormat(new Date(segment.departure.at));
  const secondDate = dateFormat(new Date(segment.arrival.at));

  return (
    <div className="segment">
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
    <div className="segment_scale">
      <p>Pueden producirse cambios</p>
      <span>Duración de la escala: {duration}</span>
    </div>
  );
};

export default Summary;
