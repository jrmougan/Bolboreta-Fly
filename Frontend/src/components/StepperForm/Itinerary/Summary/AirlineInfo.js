import { finalDurationFormat } from '../../../../helpers/formatHelp';
import {
  AirlineLogo,
  findAirlineName,
  findFlightNumber,
} from '../../InfoFlights/helpersFlight';

const AirlineInfo = ({ code, segment }) => {
  console.log('Es aquí EDU', segment);
  const name = findAirlineName(code);
  const flightNumber = 'Pepito'; /* findFlightNumber({ segment }); */
  const aircraft = segment.aircraft;
  const duration = finalDurationFormat(segment.duration);

  console.log(segment);

  return (
    <div className='airline_info'>
      <AirlineLogo airlineCode={code} />
      <div className=''>
        <p className='bold'>
          {name} - {flightNumber}
        </p>
        <span> Tipo de avión/vehículo: {aircraft} - Clase Turista</span>
      </div>
      <div className='flight_duration_container'>
        <p className='flight_duration'>{duration}</p>
      </div>
    </div>
  );
};

export default AirlineInfo;
