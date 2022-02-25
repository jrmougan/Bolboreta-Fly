import React from 'react';
import { findAirportInfo } from '../../InfoFlights/helpersFlight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AirportInfo = ({ time, code, date }) => {
  const name = findAirportInfo(code, 'airport');
  const city = findAirportInfo(code, 'city');
  const country = findAirportInfo(code, 'country');

  return (
    <React.Fragment>
      <p className='airport_info bold'>
        <CheckCircleOutlineIcon /> {time} - {name} ({code}) {city} -{country}
      </p>
      <span className='date_flight'>{date} </span>
    </React.Fragment>
  );
};

export default AirportInfo;
