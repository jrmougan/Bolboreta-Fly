const ScheduleContainer = ({
  totalDuration,
  timeDeparture,
  timeArrival,
  scales,
}) => {
  return (
    <section className='schedule_container'>
      <p>{totalDuration}</p>
      <p>
        {timeDeparture} - {timeArrival}
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
