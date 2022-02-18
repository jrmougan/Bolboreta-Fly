export const ADULTS = [
  {
    label: '1 adulto',
    value: 1,
  },
  {
    label: '2 adultos',
    value: 2,
  },
  {
    label: '3 adultos',
    value: 3,
  },
  {
    label: '4 adultos',
    value: 4,
  },
  {
    label: '5 adultos',
    value: 5,
  },
  {
    label: '6 adultos',
    value: 6,
  },
];

export const tripIncludes = [
  {
    id: 1,
    value:
      'Gestiona tu viaje desde el móvil: recibe un mensaje en el móvil con un enlace a una página web personalizada donde podrás consultar el estado de tu viaje',
  },
  {
    id: 2,
    value:
      'Alertas sobre tu vuelo en tu teléfono: te mandamos un mensaje al móvil informándote de cualquier cambio en tu vuelo',
  },
  {
    id: 3,
    value:
      'Atención al Cliente prioritaria: recibe atención al cliente prioritaria a través del número de teléfono con tarifa reducida',
  },
  {
    id: 4,
    value:
      'Cambios en tu reserva: modificaciones y cancelaciones sin ningún coste adicional',
  },
];

export const RATES = [
  {
    title: 'Económica',
    included: [' 1 x equipaje de mano'],
    nonIncluded: [
      '2 x maletas',
      'Embarque prioritario',
      'Comida en vuelo',
      'Entretenimiento',
    ],
    price: '150',
  },
  {
    title: 'Plus',
    included: [' 1 x equipaje de mano', 'Entretenimiento'],
    nonIncluded: ['2 x maletas', 'Embarque prioritario', 'Comida en vuelo'],
    price: '227',
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
    price: '350',
  },
];

export const CancellationPolicy = () => {
  return (
    <article className='cancelation_container'>
      <h3>Política de cancelación</h3>
      <p>
        Este vuelo tiene una política de cancelación flexible. Si cancela o
        cambiar su vuelo hasta 30 días antes de la fecha de salida, es elegible
        para un reembolso gratuito. Todos los vuelos reservados en Bolboreta
        están respaldados por nuestra garantía de satisfacción, sin embargo, las
        políticas de cancelación varían serún las aerolíneas. Consulte la
        política de cancelacion completa de este vuelo.
      </p>
    </article>
  );
};
