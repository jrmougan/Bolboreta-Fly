const SeatAndBaggage = ({ seatChosen, superPassenger }) => {
  return (
    <article className='info_container'>
      <h1>Pasajeros, asientos y equipaje</h1>
      <h2>Firulais García</h2>
      <p className='bottom_line'>Adulto</p>
      <div className='aditional_info_container'>
        <div className='aditional_info'>
          <span>Maletas facturadas</span>
          <p> 0 maletas </p>
        </div>
        <div className='aditional_info'>
          {' '}
          <span>Asientos</span>
          <p>
            {' '}
            {seatChosen
              ? seatChosen
              : 'No se ha seleccionado ningún asiento'}{' '}
          </p>
        </div>
        <div className='aditional_info'>
          {' '}
          <span>Pasajero frecuente</span>
          <p>
            {' '}
            {superPassenger
              ? superPassenger
              : 'No se ha añadido código de pasajero frecuente'}{' '}
          </p>
        </div>
        <div className='aditional_info'>
          {' '}
          <span>Selección de comida (solicitada a compañía aérea</span>
          <p>Estándar</p>
        </div>
      </div>
    </article>
  );
};

export default SeatAndBaggage;
