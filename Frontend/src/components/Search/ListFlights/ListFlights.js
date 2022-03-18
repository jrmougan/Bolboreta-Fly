import React, { useContext } from 'react';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import { useNavigate } from 'react-router-dom';
import InputButton from './InputButton';
import AllFlights from './AllFlights';
import {
  findAirlineLogo,
  findAirlineName,
} from '../../StepperForm/InfoFlights/helpersFlight';

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

  console.log('Data en ListFlights', data);
  return (
    <section>
      {data.length > 0 &&
        data.map((flight) => {
          const id = flight.id;
          const price = flight.price.total;
          const currency = flight.price.currency;
          const code = flight.validatingAirlineCodes[0];
          console.log('flight', flight.validatingAirlineCodes[0]);

          return (
            <article key={id} id={id} className='resultCard'>
              <LeftCard>
                <AllFlights flight={flight} />
              </LeftCard>
              <RightCard>
                <Price price={price} currency={currency} />
                <CardLogo code={code} />
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
    <span>
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
