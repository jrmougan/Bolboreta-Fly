import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useContext } from 'react';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import {
  AirlineLogo,
  findAirlineLogo,
  findAirlineName,
  findFlightNumber,
} from '../InfoFlights/helpersFlight';

const Summary = ({
  returnDate,
  durationFlight,
  timeDep,
  timeArr,
  departureDate,
  arrivalDate,
  srcLogo,
}) => {
  const [flights] = useContext(OfferPriceContext);
  console.log('flights', flights);
  //  Averiguamos el código de la aerolínea
  // y mostramos su logo en pantalla
  const airlineCode = flights.validatingAirlineCodes[0];
  const airlineName = findAirlineName(airlineCode);
  //   const airlineNumber = findFlightNumber(flights);
  console.log(airlineName);
  const logo = findAirlineLogo(airlineCode);
  console.log(logo);

  //   Información de la aerolínea
  const AirlineInfo = ({ airlineName }) => {
    return (
      <div className='airline_info'>
        <AirlineLogo airlineCode={airlineCode} />
        <div className=''>
          <p className='bold'>{airlineName} - AF 1423</p>
          <span> Tipo de avión/vehículo: 318 - Clase Turista</span>
        </div>
        <div className='flight_duration_container'>
          <p className='flight_duration'>1 h 45 min</p>
        </div>
      </div>
    );
  };

  return (
    <article className='info_container'>
      <h1 className='title_info_container'>Itinerario: Vuelo</h1>
      <div className='subtitle_info_container'>
        <p className='bold'>{returnDate ? 'Ida y Vuelta' : 'Ida'}</p>
        <span>Duración {durationFlight}</span>
      </div>
      <span className='flight_confirmed'>
        {' '}
        <CheckCircleOutlineIcon /> Vuelo confirmado
      </span>
      <section id='segments_container'>
        <div className='flightPart'>
          <div className='segment'>
            {
              <p className='bold'>
                <CheckCircleOutlineIcon /> {timeDep} - {/* {airport.name} */}{' '}
                Aeropuerto de Munich ({/* {airport.code} */} MUC) Múnich -
                Alemania
              </p>
            }
            <span className='date_flight'>{departureDate} </span>
            <AirlineInfo />

            <p className='bold'>
              <CheckCircleOutlineIcon /> {timeArr} - Charles de Gaulle (CDG)
              París - Francia
            </p>
            <span className='date_flight'>{arrivalDate}</span>
          </div>
          <div className='segment_scale'>
            <p>Pueden producirse cambios</p>
            <span>Duración de la escala: 7 h 20 min</span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Summary;
