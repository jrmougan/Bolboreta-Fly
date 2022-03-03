import { RedeemSharp } from '@mui/icons-material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { createApi } from 'unsplash-js';
import './ultimasreservas.css';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';
import { useParams } from 'react-router-dom';
import useUnsplashImage from '../../hooks/useUnsplashImage';

const ACCESS_KEY_UNSPLASH = process.env.REACT_APP_ACCESS_KEY_UNSPLASH;

/* 
##########################
##  PEXELS API INTENTOS ##
##########################
*/
// Creamos la conexión con la API de UNSPLASH
const api = createApi({ accessKey: ACCESS_KEY_UNSPLASH });

export const UltimasReservas = () => {
  // Obtenemos el id mediante params
  const { idUser } = useParams();

  // Obtenemos el id de usuario correspondiente a nuestro Token
  const [token] = useContext(TokenContext);
  const tokenId = decodeTokenData(token).id;

  // Donde agrupamos todas las reservas
  const [reservas, setReservas] = useState([]);

  // Recogemos las reservas
  const searchBookings = async () => {
    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${idUser}/getBookings`
    );
    if (res.ok) {
      const body = await res.json();
      const bookings = body.data;
      setReservas(bookings);
    }
  };

  // Imagen del aeropuerto
  useEffect(() => {
    searchBookings();
  }, []);

  return (
    <main>
      <h2>Estos son tus últimos vuelos </h2>

      {reservas.map((reserva, key) => {
        // Averiguamos a qué ciudad va para conseguir la foto del Background
        const iataArrival = reserva.bookingObject[0].arrival_code || 'SCQ';
        const cityArrival = findAirportInfo(iataArrival, 'city');

        return (
          <div key={key}>
            <Reserva
              reservas={reservas}
              searchBookings={searchBookings}
              // busqueda={cityArrival}
              busqueda={'Barcelona'}
              reserva={reserva}
            />
          </div>
        );
      })}
    </main>
  );
};

const Reserva = ({ reservas, searchBookings, reserva, busqueda }) => {
  // Llamamos a la api de Unsplash
  const { srcPhoto } = useUnsplashImage(busqueda);

  // Datos de una reserva individual
  const iataArrival = reserva.bookingObject[0].arrival_code || 'SCQ';
  const iataDeparture = reserva.bookingObject[0].departure_code || 'AGP';
  const codeBooking = reserva.bookingObject[0].booking_code;
  const departure_time = reserva.bookingObject[0].departure_time || '15:30';

  //  Ciudades de salida y llegada
  const cityArrival = findAirportInfo(iataArrival, 'city');
  const cityDeparture = findAirportInfo(iataDeparture, 'city');

  // Horario de salida
  const departureTime =
    departure_time === null ? 'departure_time' : departure_time;

  return (
    <>
      <article className='card-flight'>
        <div className={`hero-reserva`}>
          <img
            alt='foto de ciudad'
            src={srcPhoto}
            className='background_cardFlight'
          />
          <p>
            {' '}
            {'Fecha: 1 de enero de 2020'} - {departureTime}
          </p>
          <h3>
            {cityDeparture} - {cityArrival}
          </h3>
        </div>
        <div className='lastbook-end'>
          <h4>Felicidades ! Está todo listo para su viaje</h4>
          <button className='btn btn-gestionar' onClick={searchBookings}>
            Gestionar Reserva
          </button>
        </div>
      </article>
    </>
  );
};

export default UltimasReservas;
