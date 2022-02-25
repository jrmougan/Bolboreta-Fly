import {
  findAirlineLogo,
  findAirlineName,
  findFlightNumber,
} from '../InfoFlights/helpersFlight';

const AirlineContainer = ({ code, itinerary }) => {
  return (
    <section className='airline_container'>
      <div className='airline_logo'>{findAirlineLogo(code)}</div>
      <div className='airline_name'>
        <h4>{findAirlineName(code)}</h4>
        <p>{/* {findFlightNumber(itinerary)} */} 'Pepito'</p>
      </div>
    </section>
  );
};

export default AirlineContainer;
