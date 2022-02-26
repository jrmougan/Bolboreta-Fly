import { FaPlane } from 'react-icons/fa';

const ReturnFlight = ({
  timeDeparture,
  timeArrival,
  totalDuration,
  iataOrigin,
  iataDestination,
  klass,
}) => {
  return (
    <div className='flightItem'>
      <p className='fareOption'>{klass} CLASS</p>
      <div className='timeFlight'>
        <span>{timeDeparture}</span>
        <div className='duration_listflights'>{totalDuration}</div>
        <span>{timeArrival}</span>
      </div>
      <div className='origin_destination'>
        <p>{iataOrigin}</p>
        <FaPlane />
        <p>{iataDestination}</p>
      </div>
    </div>
  );
};

export default ReturnFlight;
