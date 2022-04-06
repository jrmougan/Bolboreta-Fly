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
        durationSegment = body.data[0][0].duration;
        setLoading(false);
        setDuration(finalDurationFormat(body.data[0][0].duration));
      }
    } catch (error) {
    } finally {
      controller.abort();
    }
  };

  if (number) {
    getDurationByNumberAndBooking(idBooking, number);
  }

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
