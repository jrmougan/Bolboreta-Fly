import React, { useContext, useState } from 'react';
import PayPal from '../../PayPal/PayPal';
import { CancellationPolicy } from '../InfoFlights/constantInfo';
import offerprice from '../InfoFlights/offerpriceExample.json';
import { writeDuration } from '../../../helpers/formatHelp';
import airlines from '../InfoFlights/airlines.json';
import {
  findAirlineLogo,
  findAirlineName,
  findFlightNumber,
} from '../InfoFlights/helpersFlight';
import { parse, end, toSeconds, pattern } from 'iso8601-duration';

import PaymentElection from './PaymentElection';
import { TokenContext } from '../../../context/TokenContext';

const flightOffer = offerprice.data.flightOffers[0];
const [itineraries] = flightOffer.itineraries;

/* 
#########################
## Itinerary variables ##
#########################
*/
const outboundItinerary = itineraries.segments[0];
const roundtripItinerary = itineraries.segments[1];

// Duración en formato ISO 8601
const outboundDurationToFormat = outboundItinerary.duration;
const roundtripDurationToFormat = roundtripItinerary.duration;

console.log(toSeconds(parse(outboundDurationToFormat)));

//  Averiguamos el código de la aerolínea
// y mostramos su logo en pantalla
const airlineCode = flightOffer.validatingAirlineCodes[0];

/* 
##################
## ResumeAndPay ##
##################
*/

const ResumeandPay = ({ rateCharge, setRateCharge, travelers }) => {
  const [token] = useContext(TokenContext);
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

  /* 
   #########################
  ## Offerprice petición  ##
  ##########################
  */

  const orderFlight = async (e) => {
    const flightOrder = {
      itinerary: [itineraries],
      travelers: travelers,
    };
    e.preventDefault();

    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/newBooking`,
      {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: flightOrder,
      }
    );
  };

  return (
    <section className='paymentConfirmationContainer'>
      <PaymentElection>
        <PayPal />
        <CancellationPolicy />
      </PaymentElection>

      <div className='paymentConfirmation'>
        <section className='flight_resume'>
          <div className='flight_resume_way flight_resume_going'>
            <section className='airline_container'>
              <div className='airline_logo'>{findAirlineLogo(airlineCode)}</div>
              <div className='airline_name'>
                <h4>{findAirlineName(airlineCode)}</h4>
                <p>{findFlightNumber(outboundItinerary)}</p>
              </div>
            </section>
            <section className='schedule_container'>
              <p>{writeDuration(outboundDurationToFormat)}</p>
              <p>9:50 - 11:00 PM</p>
              <p>
                {' '}
                {scalesGoing ? `Hay ${scalesGoing} escalas` : 'Sin escalas'}
              </p>
            </section>
          </div>
          <div className='flight_resume_way flight_resume_return'>
            <div className='airline_container'>
              <div className='airline_logo'>{findAirlineLogo(airlineCode)}</div>
              <div className='airline_name'>
                <h4>{findAirlineName(airlineCode)}</h4>
                <p>{findFlightNumber(roundtripItinerary)}</p>
              </div>
            </div>
            <div className='schedule_container'>
              <p>{writeDuration(roundtripDurationToFormat)}</p>
              <p>9:50 - 11:00 PM</p>
              <p>
                {' '}
                {scalesGoing ? `Hay ${scalesGoing} escalas` : 'Sin escalas'}
              </p>
            </div>
          </div>
        </section>
        <section className='finalCounting'>
          <p>Subtotal {base} €</p>
          <p>Elección de tarifa {rateCharge} €</p>
          <p>Impuestos {taxes} €</p>
          <p style={{ margin: '2rem', fontSize: '1.5rem' }}>
            Total {totalPrice} {currency}
          </p>
          <button onClick={orderFlight}>Confirmar y pagar</button>
        </section>
      </div>
    </section>
  );
};

export default ResumeandPay;
