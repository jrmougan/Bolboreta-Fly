import React from 'react';
import seatMapResponse from './seatmap';

const seats = seatMapResponse.data[0].decks[0].seats;

const SeatChoice = () => {
  console.log(seats);
  return <div> Aquí va la elección de asiento</div>;
};

export default SeatChoice;
