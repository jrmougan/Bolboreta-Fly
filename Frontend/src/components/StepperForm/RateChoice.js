import React from 'react';

const RateChoice = () => {
  return (
    <div>
      <div className='rate_card'>
        <div>
          <p>Ecónomica</p>
        </div>
        <div>
          <span>Incluido</span>
          <p>1 x equipaje de mano</p>
        </div>
        <div>
          <span>No incluido</span>
          <p>2 x maletas</p>
          <p>Embarque prioritario</p>
          <p>Comida en vuelo</p>
          <p>Entretenimiento</p>
        </div>
        <div>
          <span>150€</span>
          <p> Ida y vuelta por persona</p>
          <button>Reservar</button>
        </div>
      </div>
    </div>
  );
};
const Rate = () => {
  return;
};
const rates = {
  economica: {
    title: 'Económica',
    included: ' 1 x equipaje de mano',
    nonIncluded: [
      '2 x maletas',
      'Embarque prioritario',
      'Comida en vuelo',
      'Entretenimiento',
    ],
    price: '150€',
  },
  Plus: {
    title: 'Plus',
    included: [' 1 x equipaje de mano', 'Entretenimiento'],
    nonIncluded: ['2 x maletas', 'Embarque prioritario', 'Comida en vuelo'],
    price: '227€',
  },
  Premium: {
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
};

export default RateChoice;
