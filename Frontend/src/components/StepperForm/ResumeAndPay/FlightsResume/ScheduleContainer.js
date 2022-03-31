import { durationFormat, hourFormat } from '../../../../helpers/formatHelp';

const ScheduleContainer = ({ itinerary }) => {
  // Posición del último vuelo en el array segments
  const lastSegment = Number(itinerary.segments.length) - 1;

  const timeDeparture = new Date(itinerary.segments[0].departure.at).getTime();
  const timeArrival = new Date(
    itinerary.segments[lastSegment].arrival.at
  ).getTime();

  const duration = durationFormat(timeArrival - timeDeparture);

  // Horarios de primera salida y última llegada
  const firstDeparture = hourFormat(
    new Date(itinerary.segments[0].departure.at)
  );
  const lastArrival = hourFormat(
    new Date(itinerary.segments[lastSegment].arrival.at)
  );

  // Número de escalas - Coincida con lastSegment
  const scales = lastSegment;

  return (
    <section className='schedule_container'>
      <p>{duration}</p>
      <p>
        {firstDeparture} - {lastArrival}
      </p>
      <p>
        {' '}
        {scales === 1
          ? 'Hay 1 escala'
          : scales
          ? `Hay ${scales} escalas`
          : 'Sin escalas'}
      </p>
    </section>
  );
};

export default ScheduleContainer;
