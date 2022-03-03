import useUnsplashImage from '../../hooks/useUnsplashImage';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';

const Reserva = ({ reserva, busqueda }) => {
  // Llamamos a la api de Unsplash
  const { srcPhoto } = useUnsplashImage(busqueda);

  // Datos de una reserva individual
  const iataArrival = reserva.bookingObject[0].arrival_code || 'SCQ';
  const iataDeparture = reserva.bookingObject[0].departure_code || 'AGP';
  const departure_time = reserva.bookingObject[0].departure_time || '15:30';

  //  Ciudades de salida y llegada
  const cityArrival = findAirportInfo(iataArrival, 'city');
  const cityDeparture = findAirportInfo(iataDeparture, 'city');

  // Horario de salida
  const departureTime =
    departure_time === null ? 'departure_time' : departure_time;

  return (
    <>
      <article className='card-flight'>
        <div className={`hero-reserva`}>
          <img
            alt='foto de ciudad'
            src={srcPhoto}
            className='background_cardFlight'
          />
          <p>
            {' '}
            {'Fecha: 1 de enero de 2020'} - {departureTime}
          </p>
          <h3>
            {cityDeparture} - {cityArrival}
          </h3>
        </div>
        <div className='lastbook-end'>
          <h4>Felicidades ! Está todo listo para su viaje</h4>
          <button className='btn btn-gestionar'>Gestionar Reserva</button>
        </div>
      </article>
    </>
  );
};

export default Reserva;
