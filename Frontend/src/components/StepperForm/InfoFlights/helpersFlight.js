import airlines from "./airlines.json";
import airports from "./airports.json";

const findAirlineLogo = (airlineCode) => {
  return (
    <img
      alt="Airline company logo"
      src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
    />
  );
};
const AirlineLogo = ({ airlineCode }) => {
  return (
    <img
      alt="Airline company logo"
      src={`https://images.kiwi.com/airlines/64/${airlineCode}.png`}
    />
  );
};

const findAirlineName = (airlineCode) => {
  const obj = airlines.find((airline) => {
    return airline.id === airlineCode;
  });

  if (obj) {
    const name = obj.name;
    return name;
  } else {
    return "default";
  }
};

const findFlightNumber = ({ segment }) => {
  const { carrierCode } = segment;
  const { number } = segment;
  const flightNum = carrierCode.concat(number);

  return flightNum;
};

function findAirportInfo(iataCode, option) {
  if (option === "city") {
    const airportFinded = airports.find((airport) => airport.code === iataCode);
    const locationCity = airportFinded.location.split(",")[0];
    return locationCity;
  }
  if (option === "country") {
    const airportFinded = airports.find((airport) => airport.code === iataCode);
    const locationCountry = airportFinded.location.split(",")[1];
    return locationCountry;
  }
  if (option === "airport") {
    const airportFinded = airports.find((airport) => airport.code === iataCode);
    const airportName = airportFinded.name;
    return airportName;
  }
}

export {
  findAirlineName,
  findAirlineLogo,
  findFlightNumber,
  findAirportInfo,
  AirlineLogo,
};
