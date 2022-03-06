import { dateFormat, hourFormat } from '../../../helpers/formatHelp';
import { findAirportInfo } from '../InfoFlights/helpersFlight';

const FlightBox = ({ isReturn, itinerary }) => {
  // Fecha de vuelo
  const firstDay = itinerary.segments[0].departure.at;
  const firstDayFormatted = dateFormat(firstDay);

  // Horario salida
  const timeFirstDeparture = hourFormat(new Date(firstDay));

  // Aeropuerto y ciudad de salida
  const iataDeparture = itinerary.segments[0].departure.iataCode;
  const cityDeparture = findAirportInfo(iataDeparture, 'city');

  //  Descubrir el último segmento
  const lastSegment = Number(itinerary.segments.length) - 1;

  // Horario llegada
  const lastArrival = itinerary.segments[lastSegment].arrival.at;
  const timeLastArrival = hourFormat(new Date(lastArrival));

  // Aeropuerto y ciudad de llegada
  const iataArrival = itinerary.segments[lastSegment].arrival.iataCode;
  const cityArrival = findAirportInfo(iataArrival, 'city');

  return (
    <div className='box-flight'>
      <h4> {isReturn ? 'Vuelta' : 'Ida'} </h4>
      <span className='date-flight'> {firstDayFormatted}</span>
      <div className='schedule-box'>
        <div className='departure-box'>
          <p>Salida</p>
          <div className='departure-schedule'>
            <p>{timeFirstDeparture}</p>
            <p>{cityDeparture}</p>
          </div>
        </div>
        <div className='arrival-box'>
          <p>Llegada</p>
          <div className='arrival-schedule'>
            <p>{timeLastArrival}</p>
            <p>{cityArrival}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBox;
