import { Link } from 'react-router-dom';
import { format, formatDuration } from 'date-fns';
import { FaPlane } from 'react-icons/fa';

export const ListFlights = ({ data }) => {
  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => {
          console.log(flight);
          // Para darle mayor legibilidad al código vamos a recoger la
          // información en variables más intuitivas
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

          function hourFormat(date) {
            return format(date, 'hh:mm');
          }

          // Formateamos horas y fechas para que
          // se ajuste al diseño original
          const departureToFormat = new Date(departureTime);
          const arrivalToFormat = new Date(arrivalTime);

          const timeDepartureFormatted = hourFormat(departureToFormat);

          const timeArrivalFormatted = hourFormat(arrivalToFormat);

          return (
            <article key={id} className='resultCard'>
              <div className='left-card card'>
                <div className='flightItem'>
                  <p className='fareOption'>{klass} CLASS</p>
                  <div className='timeFlight'>
                    <span>{timeDepartureFormatted}</span>
                    <div className='duration'>{flightDuration}</div>
                    <span>{timeArrivalFormatted}</span>
                  </div>
                  <div className='origin_destination'>
                    <p>{iataOrigin}</p>
                    <FaPlane />
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
