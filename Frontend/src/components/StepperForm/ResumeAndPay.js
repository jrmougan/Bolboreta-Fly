import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const LogoAirline = () => {
  return (
    <img
      alt='Airline company logo'
      src='https://images.kiwi.com/airlines/64/IB.png'
    />
  );
};

const ResumeandPay = () => {
  const [payerName, setPayerName] = useLocalStorage('payerName', '');
  const [payerCreditNumber, setPayerCreditNumber] = useLocalStorage(
    'payerCreditNumber',
    ''
  );
  const [escale, setEscale] = useLocalStorage('escales', '');
  const seatPrice = 100;
  const subtotal = 150;
  const taxes = 50;
  const totalPrice = 300;

  return (
    <div className='paymentConfirmationContainer'>
      <div className='paymentElection'>
        <h1 className='title_payment'>Método de Pago</h1>
        <p>Selecciona un método de pago</p>
        <button className='card_selection'> Tarjeta de crédito </button>
        <span> Datos de la tarjeta de crédito </span>

        <label htmlFor='facturation_address'>
          <input type='checkbox' id='facturation_address' /> Dirección de
          facturación es igual a la del pasajero 1
        </label>
        <div className='payment-info'>
          <input
            type='text'
            value={payerName}
            onChange={(e) => setPayerName(e.target.value)}
          ></input>
          <input
            type='number'
            value={payerCreditNumber}
            onChange={(e) => setPayerCreditNumber(e.target.value)}
          ></input>
          <input
            type='month'
            placeholder='Fecha de caducidad'
            value='2001-06'
          ></input>
          <input type='number' placeholder='Fecha de caducidad'></input>
        </div>
        <div className='cancelation_container'>
          <h3>Política de cancelación</h3>
          <p>
            Este vuelo tiene una política de cancelación flexible. Si cancela o
            cambiar su vuelo hasta 30 días antes de la fecha de salida, es
            elegible para un reembolso gratuito. Todos los vuelos reservados en
            Bolboreta están respaldados por nuestra garantía de satisfacción,
            sin embargo, las políticas de cancelación varían serún las
            aerolíneas. Consulte la política de cancelacion completa de este
            vuelo.
          </p>
        </div>
      </div>
      <div className='paymentConfirmation'>
        <div className='flight_resume'>
          <div className='flight_resume_way flight_resume_going'>
            <div className='airline_container'>
              <div className='airline_logo'>
                <LogoAirline />
              </div>
              <div className='airline_name'>
                <h4>Iberia</h4>
                <p>FIG4312</p>
              </div>
            </div>
            <div className='schedule_container'>
              <p>1h 10 min</p>
              <p>9:50 - 11:00 PM</p>
              <p> {escale}</p>
            </div>
          </div>
          <div className='flight_resume_way flight_resume_return'>
            <div className='airline_container'>
              <div className='airline_logo'>
                <LogoAirline />
              </div>
              <div className='airline_name'>
                <h4>Iberia</h4>
                <p>FIG4312</p>
              </div>
            </div>
            <div className='schedule_container'>
              <p>1h 10 min</p>
              <p>9:50 - 11:00 PM</p>
              <p> {escale}</p>
            </div>
          </div>
        </div>
        <div className='finalCounting'>
          <p>Actualización de asiento {seatPrice}€</p>
          <p>Subtotal {subtotal}€</p>
          <p>Impuestos {taxes}€</p>
          <p>Total {totalPrice}€</p>
          <button>Confirmar y pagar</button>
        </div>
      </div>
    </div>
  );
};

export default ResumeandPay;
