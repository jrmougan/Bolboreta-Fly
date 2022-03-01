import SingleFlightResume from './SingleFlightResume';

const FlightsResume = ({ itineraries, airlineCode }) => {
  // Ida / Vuelta
  const isReturn = itineraries.length !== 1;

  //Itinerarios
  const outboundItinerary = itineraries[0];
  const roundtripItinerary = isReturn ? itineraries[1] : '';

  return (
    <section className='flight_resume'>
      <SingleFlightResume
        itinerary={outboundItinerary}
        airlineCode={airlineCode}
      />
      {isReturn && (
        <SingleFlightResume
          itinerary={roundtripItinerary}
          airlineCode={airlineCode}
        />
      )}
    </section>
  );
};

export default FlightsResume;
