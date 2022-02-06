import React from 'react';
import './style.css';
import MyTrip from './MyTrip';

const Rates = () => {
  return (
    <div className='rateChoicePage'>
      <div className='rates-choices'>
        {rates.map((rate) => {
          return (
            <div className='rate-card'>
              <div className='title'>
                <h2>{rate.title} </h2>
              </div>
              <div className='included'>
                <span>Incluido</span>
                {rate.included[0] && <p>{rate.included[0]}</p>}
                {rate.included[1] && <p>{rate.included[1]}</p>}
                {rate.included[2] && <p>{rate.included[2]}</p>}
                {rate.included[3] && <p>{rate.included[3]}</p>}
              </div>
              <div className='non-included'>
                <span>No incluido</span>
                {rate.nonIncluded[0] && <p>{rate.nonIncluded[0]}</p>}
                {rate.nonIncluded[1] && <p>{rate.nonIncluded[1]}</p>}
                {rate.nonIncluded[2] && <p>{rate.nonIncluded[2]}</p>}
                {rate.nonIncluded[3] && <p>{rate.nonIncluded[3]}</p>}
              </div>
              <div className='rate-price'>
                <span>{rate.price}</span>
                <p>Tarifa por persona</p>

                <button className='btn-card'>Reservar</button>
              </div>
            </div>
          );
        })}
      </div>
      <MyTrip />
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
