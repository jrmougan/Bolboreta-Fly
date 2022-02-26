const FlightBox = ({
  dayDeparture,
  timeDeparture,
  timeArrival,
  cityDeparture,
  cityArrival,
  outbound,
}) => {
  return (
    <div className='box-flight'>
      <h4> {outbound ? 'Ida' : 'Vuelta'} </h4>
      <span className='date-flight'> {dayDeparture}</span>
      <div className='schedule-box'>
        <div className='departure-box'>
          <p>Salida</p>
          <div className='departure-schedule'>
            <p>{timeDeparture}</p>
            <p>{cityDeparture}</p>
          </div>
        </div>
        <div className='arrival-box'>
          <p>Llegada</p>
          <div className='arrival-schedule'>
            <p>{timeArrival}</p>
            <p>{cityArrival}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBox;
