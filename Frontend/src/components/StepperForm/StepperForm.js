import React, { useState } from 'react';
import FormPassenger from './FormPassenger';
import RateChoice from './RateChoice';
import BookingData from './BookingData.';
import SeatChoice from './SeatChoice/SeatChoice';
import ResumeandPay from './ResumeAndPay';
import Itinerary from './Itinerary';

const StepperForm = () => {
  const [page, setPage] = useState(0);

  const titlePage = [
    'Información de Pasajeros',
    'Datos de reserva',
    'Elección de tarifa',
    'Elección de asiento',
    'Resumen y Pago',
    'Itinerario',
  ];

  const pageDisplay = () => {
    if (page === 0) {
      return <FormPassenger />;
    } else if (page === 1) {
      return <BookingData />;
    } else if (page === 2) {
      return <RateChoice />;
    } else if (page === 3) {
      return <SeatChoice />;
    } else if (page === 4) {
      return <ResumeandPay />;
    } else {
      return <Itinerary />;
    }
  };

  return (
    <div className='stepper-form'>
      <div className='progressBar'></div>
      <div className='form-container'>
        <div className='header'>
          {' '}
          <h1>{titlePage[page]}</h1>
        </div>
        <div className='body'>{pageDisplay()}</div>
        <div className='footer'>
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <button
            disabled={page === titlePage.length - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
