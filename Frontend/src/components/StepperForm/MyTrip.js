import React from 'react';
import './style.css';

const MyTrip = ({ goingDate, returnDate }) => {
  return (
    <div className='my-trip'>
      <h2>Mi viaje</h2>
      <h3>
        {' '}
        Bilbao - Madrid (ida -vuelta) <br /> 1 adulto
      </h3>

      <div className='box-flight'>
        <h4> Ida </h4>
        <span className='date-flight'> {goingDate}</span>
        <div className='schedule-box'>
          <div className='departure-box'>
            <p>Salida</p>
            <div className='departure-schedule'>
              <p>9:50 GMT</p>
              <p>Bilbao</p>
            </div>
          </div>
          <div className='arrival-box'>
            <p>Llegada</p>
            <div className='arrival-schedule'>
              <p>11:00 GMT</p>
              <p>Madrid</p>
            </div>
          </div>
        </div>
      </div>
      <div className='box-flight'>
        <h4> Vuelta </h4>
        <span className='date-flight'> {returnDate}</span>
        <div className='schedule-box'>
          <div className='departure-box'>
            <p>Salida</p>
            <div className='departure-schedule'>
              <p>20:50 GMT</p>
              <p>Madrid</p>
            </div>
          </div>
          <div className='arrival-box'>
            <p>Llegada</p>
            <div className='arrival-schedule'>
              <p>23:00 GMT</p>
              <p>Bilbao</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrip;
