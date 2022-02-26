const TitleTrip = ({ cityDeparture, cityArrival, isOneWay, howManyAdults }) => {
  return (
    <section className='titleTrip_container'>
      <h3 className='titleTrip_cities'>
        {' '}
        {cityDeparture} - {cityArrival}{' '}
      </h3>
      <h4>
        {isOneWay} , {howManyAdults}{' '}
      </h4>
    </section>
  );
};

export default TitleTrip;
