import { FaPlane } from 'react-icons/fa';
import { finalDurationFormat, hourFormat } from '../../../helpers/formatHelp';

const Flight = ({ itinerary, scales }) => {
  // Duraciones
  const flightDuration = itinerary.duration;
  const duration = finalDurationFormat(flightDuration);

  // Encontramos la posición del último vuelo de itinerario
  const lastSegment = Number(itinerary.segments.length) - 1;

  // Códigos IATA aeropuertos de salida y destino
  const iataOrigin = itinerary.segments[0].departure.iataCode;
  const iataDestination = itinerary.segments[lastSegment].arrival.iataCode;

  // Horarios de salida y aterrizaje
  const departureTimeToFormat = new Date(itinerary.segments[0].departure.at);
  const arrivalTimeToFormat = new Date(
    itinerary.segments[lastSegment].arrival.at
  );
  // Horarios formateados
  const timeDeparture = hourFormat(departureTimeToFormat);
  const timeArrival = hourFormat(arrivalTimeToFormat);

  // Clase

  return (
    <section className='flightItem'>
      <p className='fareOption'>{'ECONOMY'} CLASS</p>
      <div className='timeFlight'>
        <span>{timeDeparture}</span>
        <div className='duration_listflights'>{duration}</div>
        <span>{timeArrival}</span>
      </div>
      <div className='origin_destination'>
        <p>{iataOrigin}</p>
        <div className='svg-container'>
          <FaPlane />

          {scales ? (
            <div className='scales-flight'>
              {' '}
              {scales}
              {scales > 1 ? ' escalas' : ' escala'}
            </div>
          ) : (
            ''
          )}
        </div>
        <p>{iataDestination}</p>
      </div>
    </section>
  );
};

export default Flight;
