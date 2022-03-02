import { RedeemSharp } from '@mui/icons-material';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../context/TokenContext';
import decodeTokenData from '../../helpers/decodeTokenData';
import { createApi } from 'unsplash-js';
import './ultimasreservas.css';
import { findAirportInfo } from '../StepperForm/InfoFlights/helpersFlight';

const ACCESS_KEY_UNSPLASH = process.env.REACT_APP_ACCESS_KEY_UNSPLASH;

/* 
##########################
##  PEXELS API INTENTOS ##
##########################
*/
// Creamos la conexión con la API de UNSPLASH
const api = createApi({ accessKey: ACCESS_KEY_UNSPLASH });

export const UltimasReservas = () => {
  // Obtenemos el id de usuario correspondiente a nuestro Token
  const [token] = useContext(TokenContext);
  const tokenId = decodeTokenData(token).id;

  // All requests made with the client will be authenticated
  findAirportInfo();

  // Donde agrupamos todas las reservas
  const [reservas, setReservas] = useState([]);

  const [hola, setHola] = useState('');

  // Usuario con 3 reservas
  let userId = 2;

  // Recogemos las reservas
  const searchBookings = async () => {
    const res = await fetch(
      `http://${process.env.REACT_APP_PUBLIC_HOST_BACKEND}:${process.env.REACT_APP_PUBLIC_PORT_BACKEND}/booking/${userId}/getBookings`
    );
    if (res.ok) {
      const body = await res.json();
      const bookings = body.data;
      setReservas(bookings);
    }
  };
  try {
  } catch (error) {
    console.error(error);
  }

  // Imagen del aeropuerto

  useEffect(() => {
    searchBookings();
  }, []);

  /* PEXELS INTENTOS */
  const url =
    'https://media.istockphoto.com/photos/paris-skyline-and-tour-eiffel-picture-id591833438?s=612x612';

  let url2;

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
              busqueda={cityArrival}
              reserva={reserva}
            />
          </div>
        );
      })}
    </main>
  );
};

const Reserva = ({ reservas, searchBookings, reserva, busqueda }) => {
  const [data, setPhotosResponse] = useState(null);
  const [individualPhoto, setIndividualPhoto] = useState();

  /* 
##############################
## DATOS RESERVA INDIVIDUAL ##
##############################
*/
  const iataArrival = reserva.bookingObject[0].arrival_code || 'SCQ';
  const iataDeparture = reserva.bookingObject[0].departure_code || 'AGP';
  const codeBooking = reserva.bookingObject[0].booking_code;
  const departure_time = reserva.bookingObject[0].departure_time || '15:30';

  //  DATOS DE CADA RESERVA
  const cityArrival = findAirportInfo(iataArrival, 'city');
  const cityDeparture = findAirportInfo(iataDeparture, 'city');

  const departureTime =
    departure_time === null ? 'departure_time' : departure_time;

  /* 
##########################
## LLAMADA API UNSPLASH ##
##########################
*/

  useEffect(() => {
    api.search
      .getPhotos({ query: busqueda, orientation: 'landscape', per_page: '1' })
      .then((result) => {
        setPhotosResponse(result);
        setIndividualPhoto(result.response.results[0].urls.regular);
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  return (
    <>
      <article className='card-flight'>
        <div className={`hero-reserva`}>
          <img
            alt='foto de ciudad'
            src={individualPhoto}
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
