import React from 'react';
import './ultimasreservas.css';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';
import { useParams } from 'react-router-dom';
import useGetBookings from '../../hooks/useGetBookings';
import Reserva from './Reserva';

export const UltimasReservas = () => {
  const { idUser } = useParams();
  // Obtenemos las reservas del usuario obtenido por params
  const [allBookings] = useGetBookings(idUser);

  return (
    <section id='allBookings_container'>
      <h2>Estos son tus últimos vuelos </h2>

      {allBookings.reverse().map((reserva, key) => {
        // Averiguamos a qué ciudad va para conseguir la foto del Background
        const iataArrival = reserva.bookingObject[0].destination_code || 'SCQ';
        const cityArrival = findAirportInfo(iataArrival, 'city');
        const { bookingId } = reserva;

        return (
          <Reserva
            key={key}
            reservas={allBookings}
            busqueda={cityArrival}
            reserva={reserva}
            code={bookingId}
          />
        );
      })}
    </section>
  );
};

export default UltimasReservas;
