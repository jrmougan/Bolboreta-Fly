import React, { useContext } from 'react';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import { useNavigate } from 'react-router-dom';
import InputButton from './InputButton';
import AllFlights from './AllFlights';
import {
  findAirlineLogo,
  findAirlineName,
} from '../../StepperForm/InfoFlights/helpersFlight';
import { GiButterfly } from 'react-icons/gi';
import { TokenContext } from '../../../context/TokenContext';
import swal from 'sweetalert';

export const ListFlights = ({ data }) => {
  //Contexto booking
  const [flightOffer, setFlightOffer] = useContext(OfferPriceContext);
  const [token, setToken] = useContext(TokenContext);
  let navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingId = e.target.parentElement.parentElement.id;
    setFlightOffer(data[bookingId - 1]);
    if (token) {
      navigate('/step');
    } else {
      swal('Para poder reservar tiene que estar logueado', '', 'error');
      navigate('/login');
    }
  };

  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => {
          const id = flight.id;
          const price = flight.price.total;
          const currency = flight.price.currency;
          const code = flight.validatingAirlineCodes[0];

          return (
            <article key={id} id={id} className='resultCard'>
              <LeftCard>
                <AllFlights flight={flight} />
              </LeftCard>
              <RightCard>
                <Price price={price} currency={currency} />
                <CardLogo code={code} />
                <InputButton handleSubmit={handleBooking}>Reservar</InputButton>
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
    <span className='price-right-card'>
      {price} {currency}
    </span>
  );
};
const CardLogo = ({ code }) => {
  return (
    <div className='card_airline_logo'>
      {' '}
      <p>
        Operado por:{' '}
        <span className='card_airline_name'>{findAirlineName(code)}</span>
      </p>
      {findAirlineLogo(code)}
    </div>
  );
};
