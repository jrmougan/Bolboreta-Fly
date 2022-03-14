import {
  durationFormat,
  finalDurationFormat,
} from '../../../../helpers/formatHelp';
import { AirlineLogo, findAirlineName } from '../../InfoFlights/helpersFlight';

const AirlineInfo = ({ segment, byRetrieving }) => {
  // Recogemos la información gracias al segmento que pasamos por props
  const { carrierCode } = segment;
  const name = findAirlineName(carrierCode);
  const { number } = segment;
  const aircraft = segment.aircraft.code;
  const numberOfFlight = carrierCode.concat(number);

  // Conseguimos la duración distinta según byRetrieving
  let durationSegment;

  if (byRetrieving) {
    const departure = new Date(segment.departure.at);
    const arrival = new Date(segment.arrival.at);
    durationSegment = durationFormat(arrival - departure);
  } else {
    durationSegment = finalDurationFormat(segment.duration);
  }

  return (
    <div className='airline_info'>
      <AirlineLogo airlineCode={carrierCode} />
      <div className=''>
        <p className='bold'>
          {name} - {numberOfFlight}
        </p>
        <span> Tipo de avión/vehículo: {aircraft} - Clase Turista</span>
      </div>
      <div className='flight_duration_container'>
        <p className='flight_duration'>{durationSegment}</p>
      </div>
    </div>
  );
};

export default AirlineInfo;
