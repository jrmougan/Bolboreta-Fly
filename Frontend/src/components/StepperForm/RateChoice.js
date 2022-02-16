import React from 'react';
import './style.css';
import MyTrip from './MyTrip';
import flightExample from './InfoFlights/flightExample';
import { dateFormat, durationFormat } from '../../helpers/formatHelp';

/* 
################################
## Averiguar tiempos de vuelo ##
################################
*/

const goingDateToFormat = new Date(
  flightExample.data.flightOffers[0].itineraries[0].segments[0].departure.at
);

const returnDateToFormat = new Date(
  flightExample.data.flightOffers[0].itineraries[0].segments[0].arrival.at
);

/* 
#######################
## FECHAS DE VUELOS  ##
#######################
*/

const goingDate = dateFormat(goingDateToFormat);
const returnDate = dateFormat(returnDateToFormat);

const Rates = () => {
  return (
    <div className='rateChoicePage'>
      <ChooseARate />
      <MyTrip goingDate={goingDate} returnDate={returnDate} />
    </div>
  );
};
const ChooseARate = () => {
  return (
    <div className='rates-choices'>
      {rates.map((rate, key) => {
        return (
          <div className='rate-card' key={key}>
            <div className='title'>
              <h2>{rate.title} </h2>
            </div>
            <div className='included'>
              <span>Incluido</span>
              <ul>
                {rate.included.map((rate, key) => {
                  return (
                    <li style={{ listStyle: 'none' }} key={key}>
                      {' '}
                      {rate}{' '}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='non-included'>
              <span>No incluido</span>
              {rate.nonIncluded.map((rate, key) => {
                return (
                  <li style={{ listStyle: 'none' }} key={key}>
                    {' '}
                    {rate}{' '}
                  </li>
                );
              })}
            </div>
            <div className='rate-price'>
              <span>{rate.price}</span>
              <p>Tarifa por persona</p>

              <button className='btn-card'>Añadir</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
const rates = [
  {
    title: 'Económica',
    included: [' 1 x equipaje de mano'],
    nonIncluded: [
      '2 x maletas',
      'Embarque prioritario',
      'Comida en vuelo',
      'Entretenimiento',
    ],
    price: '150€',
  },
  {
    title: 'Plus',
    included: [' 1 x equipaje de mano', 'Entretenimiento'],
    nonIncluded: ['2 x maletas', 'Embarque prioritario', 'Comida en vuelo'],
    price: '227€',
  },
  {
    title: 'Premium',
    included: [
      ' 1 x equipaje de mano',
      'Entretenimiento',
      '2 x maletas',
      'Embarque prioritario',
      'Comida en vuelo',
    ],
    nonIncluded: [],
    price: '350€',
  },
];

export default Rates;
