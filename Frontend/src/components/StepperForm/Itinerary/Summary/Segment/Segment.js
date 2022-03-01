import { dateFormat, hourFormat } from '../../../../../helpers/formatHelp';
import AirlineInfo from '../AirlineInfo';
import AirportInfo from '../AirportInfo';

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

export default Segment;
