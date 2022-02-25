import { useContext } from 'react';
import { FaPlane } from 'react-icons/fa';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import { useNavigate } from 'react-router-dom';
import {
  dateFormat,
  finalDurationFormat,
  hourFormat,
} from '../../../helpers/formatHelp';
import InputButton from './InputButton';
import Flight from './Flight';

export const ListFlights = ({ data }) => {
  //Contexto booking
  const [flightOffer, setFlightOffer] = useContext(OfferPriceContext);
  let navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingId = e.target.parentElement.parentElement.id;
    setFlightOffer(data[bookingId - 1]);
    navigate('/step');
  };

  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => {
          console.log(flight);
          // Para darle mayor legibilidad al código vamos a recoger la
          // información en variables más intuitivas
          const id = flight.id;
          const klass = flight.travelerPricings[0].fareOption;

          // ¿Sólo IDA?
          const { oneWay } = flight;
          // Códigos IATA de los aeropuertos
          const iataOrigin =
            flight.itineraries[0].segments[0].departure.iataCode;
          const lastSegmentFlight_outbound =
            Number(flight.itineraries[0].segments.length) - 1;
          const iataDestination =
            flight.itineraries[0].segments[lastSegmentFlight_outbound].arrival
              .iataCode;

          const lastSegmentFlight_rountrip =
            Number(flight.itineraries[1].segments.length) - 1;

          console.log('Motivo del problema', lastSegmentFlight_rountrip);
          // IDA
          const arrivalTime_outbound =
            flight.itineraries[0].segments[0].arrival.at;
          const departureTime_outbound =
            flight.itineraries[0].segments[lastSegmentFlight_outbound].departure
              .at;

          // VUELTA
          const arrivalTime_roundtrip =
            flight.itineraries[0].segments[lastSegmentFlight_outbound].arrival
              .at;
          const departureTime_rountrip =
            flight.itineraries[0].segments[0].departure.at;

          // Duraciones sin formatear
          const flightDuration_outbound = flight.itineraries[0].duration;
          const flightDuration_roundtrip = flight?.itineraries[1].duration;

          // Duraciones de los vuelos
          const totalDuration_outbound = finalDurationFormat(
            flightDuration_outbound
          );
          const totalDuration_roundtrip = finalDurationFormat(
            flightDuration_roundtrip
          );

          const price = flight.price.total;
          const currency = flight.price.currency;

          // Formateamos horas y fechas para que
          // se ajuste al diseño original

          // Horario vuelos IDA sin formatear
          const departureToFormat_outbound = new Date(departureTime_outbound);
          const arrivalToFormat_outbound = new Date(arrivalTime_outbound);

          // Horario vuelos VUELTA sin formatear
          const departureToFormat_roundtrip = new Date(departureTime_rountrip);
          const arrivalToFormat_roundtrip = new Date(arrivalTime_roundtrip);

          // Horario vuelos IDA
          const timeDeparture_outbound = hourFormat(departureToFormat_outbound);
          const timeArrival_outbound = hourFormat(arrivalToFormat_outbound);

          // Horario vuelos VUELTA
          const timeDeparture_roundtrip = hourFormat(
            departureToFormat_roundtrip
          );
          const timeArrival_roundtrip = hourFormat(arrivalToFormat_roundtrip);

          return (
            <article key={id} id={id} className='resultCard'>
              <LeftCard>
                <Flight
                  timeDeparture={timeDeparture_outbound}
                  timeArrival={timeArrival_outbound}
                  totalDuration={totalDuration_outbound}
                  iataOrigin={iataOrigin}
                  iataDestination={iataDestination}
                  klass={klass}
                />
                {!oneWay && (
                  <Flight
                    timeDeparture={timeDeparture_roundtrip}
                    timeArrival={timeArrival_roundtrip}
                    totalDuration={totalDuration_roundtrip}
                    iataOrigin={iataDestination}
                    iataDestination={iataOrigin}
                    klass={klass}
                    isReturn={true}
                  />
                )}
              </LeftCard>
              <RightCard>
                <Price price={price} currency={currency} />
                <InputButton handleSubmit={handleBooking}>
                  Ir al vuelo
                </InputButton>
              </RightCard>
            </article>
          );
        })}
    </section>
  );
};

const LeftCard = ({ children, oneWay }) => {
  return (
    <section className={`left-card card ${oneWay ? '' : 'separation_card'}`}>
      {children}
    </section>
  );
};
const RightCard = ({ children }) => {
  return <section className='right-card card'>{children}</section>;
};
const Price = ({ price, currency }) => {
  return (
    <p>
      {price} {currency}
    </p>
  );
};
