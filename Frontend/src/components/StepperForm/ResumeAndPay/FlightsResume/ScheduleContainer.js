import {
  finalDurationFormat,
  hourFormat,
} from '../../../../helpers/formatHelp';

const ScheduleContainer = ({ itinerary }) => {
  // Duración total
  const totalDuration = finalDurationFormat(itinerary.duration);

  // Posición del último vuelo en el array segments
  const lastSegment = Number(itinerary.segments.length) - 1;

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
      <p>{totalDuration}</p>
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
