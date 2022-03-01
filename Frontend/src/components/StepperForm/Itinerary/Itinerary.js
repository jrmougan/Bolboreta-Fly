import '../style.css';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import SeatAndBaggage from './SeatAndBaggage';
import { tripIncludes } from '../InfoFlights/constantInfo';
import Summary from './Summary/Summary';
import { useState } from 'react';

const Itinerary = ({ emergencyData, itineraries, totalPrice }) => {
  const [seatChosen] = useState(0);
  const [regularPassenger] = useState(null);

  const infoMainContact = {
    name: 'Firulais García',
    email: ' fulanitocontrerasmansalva@gamil.com',
    phone: ' +34 664 433 333',
    address: 'Calle Nueva Perdicion',
    creditCard: ' Visa / 4 / Euro&000',
  };

  return (
    <section className='itinerary_container_end'>
      <Summary itineraries={itineraries} />
      <SeatAndBaggage
        seatChosen={seatChosen}
        superPassenger={regularPassenger}
      />
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
