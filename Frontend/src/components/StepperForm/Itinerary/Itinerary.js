import '../style.css';
import SegmentContainer from './SegmentContainer';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import SeatAndBaggage from './SeatAndBaggage';
import flightExample from '../InfoFlights/flightExample';
import airports from '../InfoFlights/airports.json';
import airlines from '../InfoFlights/airlines.json';
import { tripIncludes } from '../InfoFlights/constantInfo';
import flightOrder from '../InfoFlights/flightOrderExample';
import { dateFormat } from '../../../helpers/formatHelp';
import { useContext } from 'react';
import { OfferPriceContext } from '../../../context/OfferPriceContext';

const Itinerary = ({ emergencyData, oneWay }) => {
  const [flights] = useContext(OfferPriceContext);
  console.log('flights', flights);

  /* 
##################
## INFO NO REAL ## SON SOLO DE PRUEBA
##################
*/

  const srcLogo = airlines[100].logo;
  const flightOffer = flightExample.data.flightOffers;
  const itineraries = flightOffer[0].itineraries[0].segments[0];
  const airlineInfo = itineraries.operating.carrierCode;
  const infoAirline = 'AF';
  const france = airlines.find((airline) => {
    return JSON.stringify(airline.code) === 'TP';
  });

  /* 
#######################
## INFO FLIGHT ORDER ## PROBAND
#######################
*/

  const durationFlightExample =
    flightOrder.data.flightOffers[0].itineraries[1].duration;

  const flightOrderInfo = {
    id: flightOrder.data.id,
  };

  const infoMainContact = {
    name: 'Firulais García',
    email: ' fulanitocontrerasmansalva@gamil.com',
    phone: ' +34 664 433 333',
    address: 'Calle Nueva Perdicion',
    creditCard: ' Visa / 4 / Euro&000',
  };

  // Info para que el código no de error y
  // visualizar casi hardcoded

  const returnDate = 0;
  const durationFlight = '11 h 35 min';
  const seatChosen = null;
  const superPassenger = '';
  const totalPrice = '128,17 €';

  // iataCode de los aeropuertos en OfferPrice de Amadeus
  const iataCode = {
    departure: itineraries.departure.iataCode,
    arrival: itineraries.arrival.iataCode,
  };

  // Horario de salida y llegada sin formatear
  const timeDeparture = itineraries.departure.at.split('T');
  const timeArrival = itineraries.arrival.at.split('T');
  const timeDep = timeDeparture[1];
  const timeArr = timeArrival[1];

  // Fecha de salida y llegada
  const departureDate = dateFormat(new Date(timeDeparture[0]));
  const arrivalDate = dateFormat(new Date(timeArrival[0]));

  return (
    <section className='itinerary_container_end'>
      <SegmentContainer
        returnDate={returnDate}
        durationFlight={durationFlight}
        timeDep={timeDep}
        departureDate={departureDate}
        arrivalDate={arrivalDate}
        timeArr={timeArr}
        srcLogo={srcLogo}
      />
      <SeatAndBaggage seatChosen={seatChosen} superPassenger={superPassenger} />
      <InTripIncluded tripIncludes={tripIncludes} />
      <ContactInfo
        infoMainContact={infoMainContact}
        totalPrice={totalPrice}
        emergencyData={emergencyData}
      />
    </section>
  );
};

export default Itinerary;
