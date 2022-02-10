import { useEffect } from 'react';
import '../style.css';
import SegmentContainer from './SegmentContainer';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import flightExample from '../InfoFlights/flightExample';
import airports from '../InfoFlights/airports.json';
import airlines from '../InfoFlights/airlines.json';
import { tripIncludes } from '../InfoFlights/constantInfo';

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
  const infoMainContact = {
    name: 'Firulais García',
    email: ' fulanitocontrerasmansalva@gamil.com',
    phone: ' +34 664 433 333',
    address: 'Calle Nueva Perdicion',
    creditCard: ' Visa / 4 / Euro&000',
  };

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
      <SegmentContainer
        returnDate={returnDate}
        durationFlight={durationFlight}
        timeDep={timeDep}
        monthDeparture={monthDeparture}
        monthArrival={monthArrival}
        timeArr={timeArr}
        srcLogo={srcLogo}
      />
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
      <InTripIncluded tripIncludes={tripIncludes} />
      <ContactInfo infoMainContact={infoMainContact} totalPrice={totalPrice} />
    </section>
  );
};

export default Itinerary;
