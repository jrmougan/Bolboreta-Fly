import React from 'react';
import './ultimasreservas.css';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';
import { useParams } from 'react-router-dom';
import useGetBookings from '../../hooks/useGetBookings';
import Reserva from './Reserva';
import useGetBookingCode from '../../hooks/useGetBookingCode';

export const UltimasReservas = () => {
  // Obtenemos el id mediante params
  const { idUser } = useParams();
  // Obtenemos las reservas del usuario obtenido por params
  const [allBookings] = useGetBookings(idUser);

  return (
    <section id='allBookings_container'>
      <h2>Estos son tus últimos vuelos </h2>

      {allBookings.map((reserva, key) => {
        // Averiguamos a qué ciudad va para conseguir la foto del Background
        const iataArrival = reserva.bookingObject[0].arrival_code || 'SCQ';
        const cityArrival = findAirportInfo(iataArrival, 'city');

        console.log('Código reserva', reserva.bookingObject[0].booking_code);

        const booking_code = reserva.bookingObject[0].booking_code;

        return (
          <Reserva
            key={key}
            reservas={allBookings}
            busqueda={cityArrival}
            reserva={reserva}
            code={booking_code}
          />
        );
      })}
    </section>
  );
};

export default UltimasReservas;
