import '../style.css';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import SeatAndBaggage from './SeatAndBaggage';
import { tripIncludes } from '../InfoFlights/constantInfo';
import Summary from './Summary/Summary';
import { useState } from 'react';

const Itinerary = ({ emergencyData, itineraries, totalPrice }) => {
  // Eliminar cuando no se necesite

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
      <SeatAndBaggage seatChosen={0} superPassenger={null} />
      <InTripIncluded tripIncludes={tripIncludes} />
      <ContactInfo
        infoMainContact={null}
        totalPrice={totalPrice}
        emergencyData={emergencyData}
      />
    </section>
  );
};

export default Itinerary;
