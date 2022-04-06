import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { dateFormat } from '../../helpers/formatHelp';
import useUnsplashImage from '../../hooks/useUnsplashImage';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';

const Reserva = ({ reserva, busqueda, code }) => {
  // Llamamos a la api de Unsplash
  const { srcPhoto } = useUnsplashImage(busqueda);

  // Datos de una reserva individual
  const iataDeparture = reserva.bookingObject[0].departure_code || 'AGP';
  const iataArrival = reserva.bookingObject[0].destination_code || 'AGP';
  const departure_time = reserva.bookingObject[0].departure_time || '15:30';

  //  Ciudades de salida y llegada
  const cityArrival = findAirportInfo(iataArrival, 'city');
  const cityDeparture = findAirportInfo(iataDeparture, 'city');

  // Fecha y hora de salida
  const time = format(new Date(departure_time), 'HH:mm');
  const date = dateFormat(departure_time);

  const Booking = ({ code }) => {
    return (
      <article className='card-flight'>
        <div className={`hero-reserva`}>
          <img
            alt='foto de ciudad'
            src={srcPhoto}
            className='background_cardFlight'
          />
          <p>
            {' '}
            {date} - {time}
          </p>
          <h3>
            {cityDeparture} - {cityArrival}
          </h3>
        </div>
        <div className='lastbook-end'>
          <h4>Felicidades ! Está todo listo para su viaje</h4>
          <Link to={`/${code}/itinerary`} className='btn btn-see-itinerary'>
            Ver itinerario
          </Link>
        </div>
      </article>
    );
  };
  return <Booking code={code} />;
};

{
}
export default Reserva;
