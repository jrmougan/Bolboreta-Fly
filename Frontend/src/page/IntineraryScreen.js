import Itinerary from '../components/StepperForm/Itinerary/Itinerary';
import Summary from '../components/StepperForm/Itinerary/Summary/Summary';
import useGetFlightOrder from '../hooks/useGetFlightOrder';

const ItineraryScreen = () => {
  const bookingCode = 'eJzTd9cPNHfz83UHAAsNAlY%3D';

  const [flightOrder] = useGetFlightOrder(bookingCode);
  const itineraries = flightOrder.data.data.flightOffers[0].itineraries;
  console.log(
    'Busqueda de los itinerarios',
    flightOrder.data.data.flightOffers[0].itineraries
  );

  return <Summary itineraries={itineraries} />;
};

export default ItineraryScreen;
