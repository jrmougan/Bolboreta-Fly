import React from 'react';
import { FaChair, FaCrown, FaHamburger, FaLuggageCart } from 'react-icons/fa';

const SeatAndBaggage = ({ seatChosen, superPassenger, travelers }) => {
  const travelerExample = {
    name: {
      firstName: 'Edu ',
      lastName: 'Sancho',
    },
  };
  return (
    <article className='info_container'>
      {travelers ? (
        travelers.map((traveler, key) => {
          return (
            <EachTravelerResume
              traveler={traveler}
              superPassenger={superPassenger}
              seatChosen={seatChosen}
              key={key}
            />
          );
        })
      ) : (
        <EachTravelerResume
          traveler={travelerExample}
          seatChosen={seatChosen}
          superPassenger={superPassenger}
        />
      )}
    </article>
  );
};

const EachTravelerResume = ({ seatChosen, traveler, superPassenger }) => {
  return (
    <React.Fragment>
      <h1>Pasajeros, asientos y equipaje</h1>
      <h2>
        {traveler.name.firstName} {traveler.name.lastName}
      </h2>
      <p className='bottom_line'>Adulto</p>
      <section className='aditional_info_container'>
        <article className='aditional_info'>
          <div className='title_box_icon'>
            <FaLuggageCart className='icon_passenger icon-color ' />
            <span>Maletas facturadas</span>
          </div>
          <p> 0 maletas </p>
        </article>
        <article className='aditional_info '>
          <div className='title_box_icon'>
            <FaChair className='icon_passenger icon-color' />{' '}
            <span>Asientos</span>
          </div>
          <p>
            {seatChosen ? seatChosen : 'No se ha seleccionado ningún asiento'}{' '}
          </p>
        </article>
        <article className='aditional_info'>
          <div className='title_box_icon'>
            <FaCrown className='icon_passenger icon-color ' />
            <span>Pasajero frecuente</span>
          </div>
          <p>
            {superPassenger
              ? superPassenger
              : 'No se ha añadido código de pasajero frecuente'}{' '}
          </p>
        </article>
        <article className='aditional_info'>
          <div className='title_box_icon'>
            <FaHamburger className='icon_passenger icon-color ' />
            <span>Selección de comida (solicitada a compañía aérea)</span>
          </div>
          <p>Estándar</p>
        </article>
      </section>
    </React.Fragment>
  );
};
export default SeatAndBaggage;
