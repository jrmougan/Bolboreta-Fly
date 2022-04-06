import React, { useState } from "react";
import seatMapResponse from "./seatmap";
import "../style.css";

const CreadorCuadrados = (a, b) => {
  let [aCounter, setACounter] = useState(0);
  let [bCounter, setBCounter] = useState(0);

  const seats = seatMapResponse.data[0].decks[0].seats;

  const number = seats[0].number;
  const coordinates = {
    x: seats[0].coordinates.x,
    y: seats[0].coordinates.y,
  };
  const status = seats[0].travelerPricing[0].seatAvailabilityStatus;

  /* seats.map((seat, key) => {
    const columnCount = 0;

    const isAvailable =
      seat.travelerPricing[0].seatAvailabilityStatus === 'AVAILABLE'
        ? 'available'
        : 'nonAvailable';

    if (columnCount <= Number(seat.coordinates.y)) {
      columnCount ++;
    } else if (columnCount > Number(seat.coordinates.y)) {
      
    }
  }); */
  let counterColumn = 0;
  for (const seat of seats) {
    let yCoord = Number(seat.coordinates.y);
    console.log(yCoord);
    console.log(counterColumn);
    if (counterColumn < yCoord) {
      counterColumn = counterColumn + 1;
    } else if (counterColumn > yCoord) {
      console.log("Columnas", counterColumn);
    }
  }

  // console.log('Columnas' , counterColumn );

  return (
    <div className={`boxMaker columns_${counterColumn}`}>
      {seats.map((seat, key) => {
        const isAvailable =
          seat.travelerPricing[0].seatAvailabilityStatus === "AVAILABLE"
            ? "available"
            : "nonAvailable";

        return (
          <div key={key} className={`box ${isAvailable} `}>
            <p>{seat.number}</p>
            <p> X {seat.coordinates.x}</p>
            <p>Y {seat.coordinates.y}</p>
            <p>{status}</p>
          </div>
        );
      })}
    </div>
  );
};
const SeatChoice = () => {
  return <div className="seats_panel">{}</div>;
};
/* const prueba = () => {
  console.log(seats);
  return (
    <article>
      {seats.map((seat) => {
        return (
          <p key={seat.number}>
            {' '}
            {seat.number} , {seat.coordinates.x} {seat.coordinates.y}
          </p>
        );
      })}
    </article>
  );
}; */
export default CreadorCuadrados;
