import '../style.css';
import ContactInfo from './ContactInfo';
import InTripIncluded from './InTripIncluded';
import SeatAndBaggage from './SeatAndBaggage';
import { tripIncludes } from '../InfoFlights/constantInfo';
import Summary from './Summary/Summary';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Itinerary = ({
  travelers,
  itineraries,
  totalPrice,
  firstTraveler,
  flightCounter,
  flightDurations,
  idBooking,
}) => {
  return (
    <section className='itinerary_container_end'>
      <Summary
        itineraries={itineraries}
        flightCounter={flightCounter}
        flightDurations={flightDurations}
        idBooking={idBooking}
      />
      <SeatAndBaggage
        seatChosen={0}
        superPassenger={null}
        travelers={travelers}
      />
      <InTripIncluded tripIncludes={tripIncludes} />
      <ContactInfo traveler={firstTraveler} totalPrice={totalPrice} />
      <Link to='/user' className='btn btn-itinerary'>
        {' '}
        <FaArrowLeft className='arrow-left-icon' /> Ir a Datos de Usuario{' '}
      </Link>
    </section>
  );
};

export default Itinerary;
