import { useEffect } from 'react';
import '../style.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import flightExample from '../InfoFlights/flightExample';
import airports from '../InfoFlights/airports.json';
import airlines from '../InfoFlights/airlines.json';
import { FaCheck } from 'react-icons/fa';
import {
  ImCreditCard,
  ImEnvelop,
  ImHome,
  ImMail4,
  ImPhone,
} from 'react-icons/im';

const dateToFormat = '2022-02-21T17:10:00';
// console.log(dateToFormat.toLocaleString());
const newDate = new Date('2022-02-21T17:10:00');
// console.log(newDate);

const srcLogo = airlines[100].logo;

const flightOffer = flightExample.data.flightOffers;
const itineraries = flightOffer[0].itineraries[0].segments[0];

const airlineInfo = itineraries.operating.carrierCode;
console.log(airlines);
console.log(flightOffer);
const infoAirline = 'AF';

const france = airlines.find((airline) => {
  return JSON.stringify(airline.code) === 'TP';
});
console.log(france);

const Itinerary = () => {
  const emailContact = ' fulanitocontrerasmansalva@gamil.com';
  const phoneContact = ' +34 664 433 333';
  const adressContact = 'Calle Nueva Perdicion';
  const creditCardContact = ' Visa / 4 / Euro&000';

  const returnDate = 0;

  const durationFlight = '11 h 35 min';
  const seatChosen = null;
  const superPassenger = '';
  const totalPrice = '128,17 €';

  // Información de flightOffer

  // Encontramos el iataCode
  const iataCode = {
    departure: itineraries.departure.iataCode,
    arrival: itineraries.arrival.iataCode,
  };

  // Información de airports

  // Horario de salida y llegada
  console.log(itineraries);
  const timeDeparture = itineraries.departure.at.split('T');
  const timeArrival = itineraries.arrival.at.split('T');
  const timeDep = timeDeparture[1];
  const timeArr = timeArrival[1];

  // Fecha de salida y llegada
  const mesDep = new Date(timeDeparture[0]);
  const mesArr = new Date(timeArrival[0]);

  const monthDeparture = mesDep.toDateString();
  const monthArrival = mesArr.toDateString();

  const dateDep = timeDeparture[0];
  const dateArr = timeArrival[0];

  return (
    <section className='itinerary_container_end'>
      <article className='info_container'>
        <h1 className='title_info_container'>Itinerario: Vuelo</h1>
        <div className='subtitle_info_container'>
          <p>{returnDate ? 'Ida y Vuelta' : 'Ida'}</p>
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
                <p>
                  <CheckCircleOutlineIcon /> {timeDep} - {/* {airport.name} */}{' '}
                  Aeropuero de Munich ({/* {airport.code} */} MUC) Múnich -
                  Alemania
                </p>
              }
              <span className='date_flight'>
                {monthDeparture} {/* Mar, 15 Dic */}{' '}
              </span>
              <div className='airline_info'>
                <img alt='Logo' src={srcLogo} />
                <div className=''>
                  <p>Air France - AF 1423</p>
                  <span> Tipo de avión/vehículo: 318 - Clase Turista</span>
                </div>
              </div>
              <p>
                <CheckCircleOutlineIcon /> {timeArr} - Charles de Gaulle (CDG)
                París - Francia
              </p>
              <span className='date_flight'>
                {monthArrival}
                {/* Mar, 15 Dic */}
              </span>
            </div>
            <div className='segment_scale'>
              <p>Pueden producirse cambios</p>
              <span>Duración de la escala: 7 h 20 min</span>
            </div>
          </div>
        </section>
      </article>
      <article className='info_container'>
        <h1>Pasajeros, asientos y equipaje</h1>
        <h2>Firulais García</h2>
        <p className='bottom_line'>Adulto</p>
        <div className='aditional_info_container'>
          <div className='aditional_info'>
            <span>Maletas facturadas</span>
            <p> 0 maletas </p>
          </div>
          <div className='aditional_info'>
            {' '}
            <span>Asientos</span>
            <p>
              {' '}
              {seatChosen
                ? seatChosen
                : 'No se ha seleccionado ningún asiento'}{' '}
            </p>
          </div>
          <div className='aditional_info'>
            {' '}
            <span>Pasajero frecuente</span>
            <p>
              {' '}
              {superPassenger
                ? superPassenger
                : 'No se ha añadido código de pasajero frecuente'}{' '}
            </p>
          </div>
          <div className='aditional_info'>
            {' '}
            <span>Selección de comida (solicitada a compañía aérea</span>
            <p>Estándar</p>
          </div>
        </div>
      </article>
      <article className='info_container'>
        <h1 className='title_include'> Tu viaje incluye</h1>
        <p>
          <FaCheck /> Gestiona tu viaje desde el móvil: recibe un mensaje en el
          móvil con un enlace a una página web personalizada donde podrás
          consultar el estado de tu viaje
        </p>
        <p>
          <FaCheck /> Alertas sobre tu vuelo en tu teléfono: te mandamos un
          mensaje al móvil informándote de cualquier cambio en tu vuelo
        </p>
        <p>
          <FaCheck /> Atención al Cliente prioritaria: recibe atención al
          cliente prioritaria a través del número de teléfono con tarifa
          reducida .
        </p>
        <p>
          <FaCheck /> Cambios en tu reserva: modificaciones y cancelaciones sin
          ningún coste adicional
        </p>
      </article>
      <article className='info_container'>
        <h1>Información de facturación</h1>
        <p className='bottom_line'>Contacto principal</p>
        <h2> Firulais García</h2>
        <div className='info_main_contact'>
          <span>
            {' '}
            <ImEnvelop />
            {emailContact}
          </span>
          <span>
            <ImPhone /> {phoneContact}
          </span>
          <span>
            <ImHome /> {adressContact}
          </span>
          <span>
            <ImCreditCard /> {creditCardContact}
          </span>
        </div>
        <span className='totalPrice'>Total: {totalPrice}</span>
      </article>
    </section>
  );
};
export default Itinerary;
