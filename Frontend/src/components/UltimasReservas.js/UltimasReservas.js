import React, { useEffect, useState } from 'react';
import './ultimasReservas.css';

export const UltimasReservas = () => {
  const [reservas, setReservas] = useState([]);
  try {
    const searchBookings = async () => {
      const userId = 1;
      const res = await fetch(
        `http://localhost:4000/booking/${userId}/getBookings`
      );

      if (res.ok) {
        console.log(
          'Se ha establecido conexión con el Backendy puede que con la base de datos'
        );
        const body = await res.json();
        const bookingsBody = body.data.bookingObject;
        setReservas(bookingsBody);
      }
    };
  } catch (error) {
    console.log(error);
  }

  return (
    <main>
      <h2>Estos son tus últimos vuelos</h2>

      <Reserva reservas={reservas} />
    </main>
  );
};

const Reserva = ({ reservas }) => {
  return (
    <>
      <article className='card-flight'>
        <div className='hero-reserva'>
          <p>{/* ${reservas.departure_time} */} Jueves, 30 Sep 2021</p>
          <h3>
            {/* ${reservas.departure_code} */}Madrid - Santiago
            {/* ${reservas.arrival_code} */}
          </h3>
        </div>
        <div className='lastbook-end'>
          <h4>Felicidades ! Está todo listo para su viaje</h4>
          <button className='btn btn-gestionar'>Gestionar Reserva</button>
        </div>
      </article>
      <article className='card-flight'>
        <div className='hero-reserva'>
          <p>{/* ${reservas.departure_time} */} Jueves, 30 Sep 2021</p>
          <h3>
            {/* ${reservas.departure_code} */}Madrid - Santiago
            {/* ${reservas.arrival_code} */}
          </h3>
        </div>
        <div className='lastbook-end'>
          <h4>Felicidades ! Está todo listo para su viaje</h4>
          <button className='btn btn-gestionar'>Gestionar Reserva</button>
        </div>
      </article>
    </>
  );
};
