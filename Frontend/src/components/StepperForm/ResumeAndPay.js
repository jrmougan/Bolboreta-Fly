import React, { useState } from 'react';
import PayPal from '../PayPal/PayPal';
import { CancellationPolicy } from './InfoFlights/constantInfo';
import offerprice from './InfoFlights/offerpriceExample.json';
import { writeDuration } from '../../helpers/formatHelp';

console.log(offerprice.data.flightOffers[0]);

const flightOffer = offerprice.data.flightOffers[0];
const [itineraries] = flightOffer.itineraries;
const duration = itineraries.duration;

// console.log(itineraries.duration);

//  Averiguamos el código de la aerolínea
// y mostramos su logo en pantalla

const airlineCode = flightOffer.validatingAirlineCodes[0];

const logoAirline = (airlineCode) => {
  return (
    <img
      alt='Airline company logo'
      src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
    />
  );
};

const ResumeandPay = ({ rateCharge, setRateCharge }) => {
  /* 
  #####################################
  ## Offerprice variables monetarias ##
  #####################################
  */

  const priceOptions = flightOffer.price;
  const { base, currency, grandTotal } = priceOptions;
  const precioTotal = Number(grandTotal);
  const totalPrice = precioTotal + rateCharge;
  const taxes = 0.21;
  const scalesGoing = flightOffer.itineraries[0].segments[0].numberOfStops;
  const seatPrice = 0;

  /* 
   #######################################
  ## Offerprice variables de los vuelos ##
  ########################################
  */

  const durationGoing = flightOffer;

  console.log(durationGoing.itineraries);

  /* 
   #########################
  ## Offerprice petición  ##
  ##########################
  */

  const flightOrder = {
    type: 'flight-order',
    flightOffers: [itineraries],
  };

  return (
    <div className='paymentConfirmationContainer'>
      <div className='paymentElection'>
        <h1 className='title_payment'>Método de Pago</h1>
        <PayPal />
        <CancellationPolicy />
      </div>
      <div className='paymentConfirmation'>
        <div className='flight_resume'>
          <div className='flight_resume_way flight_resume_going'>
            <div className='airline_container'>
              <div className='airline_logo'>{logoAirline(airlineCode)}</div>
              <div className='airline_name'>
                <h4>Iberia</h4>
                <p>FIG4312</p>
              </div>
            </div>
            <div className='schedule_container'>
              <p>1h 10 min</p>
              <p>9:50 - 11:00 PM</p>
              <p>
                {' '}
                {scalesGoing ? `Hay ${scalesGoing} escalas` : 'Sin escalas'}
              </p>
            </div>
          </div>
          <div className='flight_resume_way flight_resume_return'>
            <div className='airline_container'>
              <div className='airline_logo'>{logoAirline(airlineCode)}</div>
              <div className='airline_name'>
                <h4>Iberia</h4>
                <p>FIG4312</p>
              </div>
            </div>
            <div className='schedule_container'>
              <p>1h 10 min</p>
              <p>9:50 - 11:00 PM</p>
              <p>
                {' '}
                {scalesGoing ? `Hay ${scalesGoing} escalas` : 'Sin escalas'}
              </p>
            </div>
          </div>
        </div>
        <div className='finalCounting'>
          <p>Actualización de asiento {seatPrice} €</p>
          <p>Subtotal {base} €</p>
          <p>Elección de tarifa {rateCharge} €</p>
          <p>Impuestos {taxes} €</p>
          <p style={{ margin: '2rem', fontSize: '1.5rem' }}>
            Total {totalPrice} {currency}
          </p>
          <button>Confirmar y pagar</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeandPay;
