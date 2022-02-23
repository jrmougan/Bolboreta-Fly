import airlines from './airlines.json';

const findAirlineLogo = (airlineCode) => {
  return (
    <img
      alt='Airline company logo'
      src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
    />
  );
};

const findAirlineName = (airlineCode) => {
  const obj = airlines.find((airline) => {
    return airline.id === airlineCode;
  });
  const name = obj.name;
  return name;
};

const findFlightNumber = (flightItinerary) => {
  const { carrierCode } = flightItinerary;
  const { number } = flightItinerary;
  const flightNum = carrierCode.concat(number);

  return flightNum;
};

export { findAirlineName, findAirlineLogo, findFlightNumber };
