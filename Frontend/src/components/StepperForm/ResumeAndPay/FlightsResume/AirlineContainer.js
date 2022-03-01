import {
  findAirlineLogo,
  findAirlineName,
} from '../../InfoFlights/helpersFlight';

const AirlineContainer = ({ itinerary, code }) => {
  const name = findAirlineName(code);
  const lastSegment = itinerary.segments.length - 1;
  const lastFlight = itinerary.segments[lastSegment];
  const { carrierCode, number } = lastFlight;
  const flightNumber = carrierCode.concat(number);

  return (
    <section className='airline_container'>
      <div className='airline_logo'>{findAirlineLogo(code)}</div>
      <div className='airline_name'>
        <h4>{name}</h4>
        <p>{flightNumber}</p>
      </div>
    </section>
  );
};

export default AirlineContainer;
