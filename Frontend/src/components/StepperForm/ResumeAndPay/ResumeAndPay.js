import React, { useContext } from 'react';
import PayPal from '../../PayPal/PayPal';
import { CancellationPolicy } from '../InfoFlights/constantInfo';
import { finalDurationFormat, hourFormat } from '../../../helpers/formatHelp';
import {
  findAirlineLogo,
  findAirlineName,
  findFlightNumber,
} from '../InfoFlights/helpersFlight';
import { TokenContext } from '../../../context/TokenContext';
import PaymentElection from './PaymentElection';
import { OfferPriceContext } from '../../../context/OfferPriceContext';
import AirlineContainer from './AirlineContainer';
import ScheduleContainer from './ScheduleContainer';

const ResumeandPay = ({ rateCharge, travelers }) => {
  /* 
  ###############
  ## CONTEXTOS ##
  ###############
  */
  const [token] = useContext(TokenContext);
  const [flight] = useContext(OfferPriceContext);
  const flightOffer = flight;
  const [itinerary] = flightOffer.itineraries;

  const { itineraries } = flight;

  /* 
  #########################
  ## Itinerary durations ##
  #########################
  */

  const totalDuration_outbound = finalDurationFormat(itineraries[0].duration);
  const totalDuration_roundtrip = finalDurationFormat(itineraries[1].duration);

  /* 
  #########################
  ## Itinerary variables ##
  #########################
  */
  const outboundItinerary = itinerary.segments[0];
  const roundtripItinerary = itinerary.segments[1];

  /* 
  #########################
  ## Itinerary  schedule ##
  #########################
  */
  // Horario del viaje de IDA
  const timeDeparture_outbound = hourFormat(
    new Date(itineraries[0].segments[0].departure.at)
  );
  const lastSegmentOutbound = Number(flight.itineraries[0].segments.length) - 1;
  const timeArrival_outbound = hourFormat(
    new Date(itineraries[0].segments[lastSegmentOutbound].arrival.at)
  );

  // Horario del viaje de VUELTA
  const timeDeparture_roundtrip = hourFormat(
    new Date(itineraries[1].segments[0].departure.at)
  );
  const lastSegmentRoundtrip =
    Number(flight.itineraries[1].segments.length) - 1;
  const timeArrival_roundtrip = hourFormat(
    new Date(itineraries[1].segments[lastSegmentRoundtrip].arrival.at)
  );

  //  Averiguamos el código de la aerolínea
  // y mostramos su logo en pantalla
  const airlineCode = flightOffer.validatingAirlineCodes[0];

  // Número de escalas
  const scales_outbound = Number(itineraries[0].segments.length) - 1;
  const scales_roundtrip = Number(itineraries[1].segments.length) - 1;
  console.log('escalas', scales_outbound);
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
  console.log(scalesGoing);

  /* 
   #########################
  ## Offerprice petición  ##
  ##########################
  */

  const orderFlight = async (e) => {
    const flightOrder = {
      itinerary: [itinerary],
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
    console.log(res);
  };
  const FlightResume = () => {
    return (
      <section className='flight_resume'>
        <div className='flight_resume_way flight_resume_going'>
          <AirlineContainer code={airlineCode} itinerary={outboundItinerary} />
          <ScheduleContainer
            totalDuration={totalDuration_outbound}
            timeDeparture={timeDeparture_outbound}
            timeArrival={timeArrival_outbound}
            scales={scales_outbound}
          />
        </div>
        <div className='flight_resume_way flight_resume_return'>
          {
            <AirlineContainer
              code={airlineCode}
              itinerary={roundtripItinerary}
            />
          }
          <ScheduleContainer
            totalDuration={totalDuration_roundtrip}
            timeDeparture={timeDeparture_roundtrip}
            timeArrival={timeArrival_roundtrip}
            scales={scales_roundtrip}
          />
        </div>
      </section>
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
            <AirlineContainer
              code={airlineCode}
              itinerary={outboundItinerary}
            />
            <ScheduleContainer
              totalDuration={totalDuration_outbound}
              timeDeparture={timeDeparture_outbound}
              timeArrival={timeArrival_outbound}
              scales={scales_outbound}
            />
          </div>
          <div className='flight_resume_way flight_resume_return'>
            {
              <AirlineContainer
                code={airlineCode}
                itinerary={roundtripItinerary}
              />
            }
            <ScheduleContainer
              totalDuration={totalDuration_roundtrip}
              timeDeparture={timeDeparture_roundtrip}
              timeArrival={timeArrival_roundtrip}
              scales={scales_roundtrip}
            />
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
