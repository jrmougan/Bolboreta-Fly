import { Link } from 'react-router-dom';

export const ListFlights = ({ data }) => {
  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => (
          <article key={flight.id} className='resultCard'>
            <div className='left-card card'>
              <div className='flightItem'>
                <p>{flight.travelerPricings[0].fareOption} CLASS</p>
                <div className='timeFlight'>
                  <span>{flight.itineraries[0].segments[0].arrival.at}</span>
                  <div className='duration'>
                    {flight.itineraries[0].duration}
                  </div>
                  <span>{flight.itineraries[0].segments[0].departure.at}</span>
                </div>
                <div className='origin_destination'>
                  <p>{flight.itineraries[0].segments[0].departure.iataCode}</p>
                  <p>{flight.itineraries[0].segments[0].arrival.iataCode}</p>
                </div>
              </div>
            </div>
            <div className='right-card card'>
              <p>
                {flight.price.total} {flight.price.currency}
              </p>
              <Link to='/stepper/1' className='btn btnFlight'>
                Ir al vuelo
              </Link>
            </div>
          </article>
        ))}
    </section>
  );
};
