import { Link } from 'react-router-dom';

export const ListFlights = ({ data }) => {
  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => {
          const id = flight.id;
          const klass = flight.travelerPricings[0].fareOption;
          const arrivalTime = flight.itineraries[0].segments[0].arrival.at;
          const departureTime = flight.itineraries[0].segments[0].departure.at;
          const flightDuration = flight.itineraries[0].duration;
          const price = flight.price.total;
          const currency = flight.price.currency;
          const iataOrigin =
            flight.itineraries[0].segments[0].departure.iataCode;
          const iataDestination =
            flight.itineraries[0].segments[0].arrival.iataCode;
          return (
            <article key={id} className='resultCard'>
              <div className='left-card card'>
                <div className='flightItem'>
                  <p>{klass} CLASS</p>
                  <div className='timeFlight'>
                    <span>{arrivalTime}</span>
                    <div className='duration'>{flightDuration}</div>
                    <span>{departureTime}</span>
                  </div>
                  <div className='origin_destination'>
                    <p>{iataOrigin}</p>
                    <p>{iataDestination}</p>
                  </div>
                </div>
              </div>
              <div className='right-card card'>
                <p>
                  {price} {currency}
                </p>
                <Link to='/stepper/1' className='btn btnFlight'>
                  Ir al vuelo
                </Link>
              </div>
            </article>
          );
        })}
    </section>
  );
};
