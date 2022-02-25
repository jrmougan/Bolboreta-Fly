import '../style.css';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import SeatAndBaggage from './SeatAndBaggage';
import { tripIncludes } from '../InfoFlights/constantInfo';
import Summary from './Summary/Summary';

const Itinerary = ({ emergencyData, itineraries }) => {
  const infoMainContact = {
    name: 'Firulais García',
    email: ' fulanitocontrerasmansalva@gamil.com',
    phone: ' +34 664 433 333',
    address: 'Calle Nueva Perdicion',
    creditCard: ' Visa / 4 / Euro&000',
  };

  // Info para que el código no de error y
  // visualizar casi hardcoded
  const seatChosen = null;
  const superPassenger = '';
  const totalPrice = '128,17 €';

  return (
    <section className='itinerary_container_end'>
      <Summary itineraries={itineraries} />
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
