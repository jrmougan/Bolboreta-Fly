<section id='segments_container'>
  <div className='flightPart'>
    <div className='segment'>
      <AirportInfo
        time={timeDepaFirst}
        code={firstAirport_code}
        date={dateFirstDepa}
      />

      <AirlineInfo code={airlineCode} segment={firstSegment} />

      <AirportInfo
        time={timeArrivFirst}
        code={secondAirport_code}
        date={dateArrivaDepa}
      />
    </div>
    <div className='segment_scale'>
      <p>Pueden producirse cambios</p>
      <span>Duración de la escala: 7 h 20 min</span>
    </div>
  </div>
</section>;

/* 
  ###################
  ## INFO SCHEDULE ##
  ###################
  */

const timeDepaFirst = hourFormat(
  new Date(itineraries[0].segments[0].departure.at)
);
const dateFirstDepa = dateFormat(
  new Date(itineraries[0].segments[0].departure.at)
);
const timeArrivFirst = hourFormat(
  new Date(itineraries[0].segments[0].arrival.at)
);
const dateArrivaDepa = dateFormat(
  new Date(itineraries[0].segments[0].arrival.at)
);

console.log('Info depa');

//   Información de los aeropuertos del primer vuelo
const firstAirport_code = itineraries[0].segments[0].departure.iataCode;
//   Información de la aerolínea del segundo vuelo
const secondAirport_code = itineraries[0].segments[0].arrival.iataCode;

{
  segments_roundtrip.map((segment, key) => {
    // Códigos IATA de aeropuertos de salida y llegada
    const firstCode = segment.departure.iataCode;
    const secondCode = segment.arrival.iataCode;

    const firstTime = hourFormat(new Date(segment.departure.at));
    const secondTime = hourFormat(new Date(segment.arrival.at));

    const firstDate = dateFormat(new Date(segment.departure.at));
    const secondDate = dateFormat(new Date(segment.arrival.at));
    return (
      <section id='segments_container' key={key}>
        <div className='flightPart'>
          <div className='segment'>
            <AirportInfo
              time={firstTime}
              code={firstCode}
              date={firstDate}
              segments={segment}
            />

            <AirlineInfo code={airlineCode} segment={segment} />

            <AirportInfo
              time={secondTime}
              code={secondCode}
              date={secondDate}
            />
          </div>
          <ScaleSegment />
        </div>
      </section>
    );
  });
}
