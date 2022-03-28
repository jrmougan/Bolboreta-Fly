import React, { useState } from 'react';
import {
  durationFormat,
  finalDurationFormat,
} from '../../../../helpers/formatHelp';
import { AirlineLogo, findAirlineName } from '../../InfoFlights/helpersFlight';
import { MoonLoader } from 'react-spinners';
import { css } from '@emotion/react';

import { toSeconds, parse } from 'iso8601-duration';

const override = css`
  display: block;
  margin: 3rem auto;
  border-color: red;
`;

const AirlineInfo = ({
  segment,
  byRetrieving,
  idBooking,
  setTotalDuration,
  itineraryDuration,
  setItineraryDuration,
}) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);

  // Recogemos la información gracias al segmento que pasamos por props
  const { carrierCode } = segment;
  const name = findAirlineName(carrierCode);
  const { number } = segment;
  const aircraft = segment.aircraft.code;
  const numberOfFlight = carrierCode.concat(number);

  // Conseguimos la duración distinta según byRetrieving
  let durationSegment;

  /*   if (byRetrieving) {
    const departure = new Date(segment.departure.at);
    const arrival = new Date(segment.arrival.at);
    durationSegment = durationFormat(arrival - departure);
  } else {
    durationSegment = finalDurationFormat(segment.duration);
  }
 */
  const getDurationByNumberAndBooking = async () => {
    try {
      const res = await fetch(
        `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/flight/${idBooking}/${number}`
      );
      if (res.ok) {
        /*         const body = await res.json();
        console.log('Duración nueva', body.data[0][0].duration);
        durationSegment = body.data[0][0].duration;
        setDuration(finalDurationFormat(body.data[0][0].duration));
        setLoading(false);
        console.log('Duración nueva 2', body.data[0][0].duration);
        let durationInMs = toSeconds(parse(body.data[0][0].duration)) * 1000;
        console.log('Duration in MS', durationInMs);
        console.log('Duración formateada', durationFormat(durationInMs));
        setItineraryDuration(Number(itineraryDuration) + Number(durationInMs)); */
      }
    } catch (error) {}
  };

  /*   if (number) {
    getDurationByNumberAndBooking();
  } */

  return (
    <React.Fragment>
      {loading ? (
        <MoonLoader className='rotator' css={override} />
      ) : (
        <div className='airline_info'>
          <AirlineLogo airlineCode={carrierCode} />
          <div className=''>
            <p className='bold'>
              {name} - {numberOfFlight}
            </p>
            <span> Tipo de avión/vehículo: {aircraft} - Clase Turista</span>
          </div>
          <div className='flight_duration_container'>
            <p className='flight_duration'>{duration}</p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AirlineInfo;
