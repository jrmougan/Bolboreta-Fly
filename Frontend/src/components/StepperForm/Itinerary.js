import './style.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { FaCheck } from 'react-icons/fa';
import {
  ImCreditCard,
  ImEnvelop,
  ImHome,
  ImMail4,
  ImPhone,
} from 'react-icons/im';

const Itinerary = () => {
  const emailContact = ' fulanitocontrerasmansalva@gamil.com';
  const phoneContact = ' +34 664 433 333';
  const adressContact = 'Calle Nueva Perdicion';
  const creditCardContact = ' Visa / 4 / Euro&000';

  const returnDate = 0;
  const departureTime = '11 h 35 min';
  const seatChosen = null;
  const superPassenger = '';
  const totalPrice = '128,17 €';

  return (
    <section className='itinerary_container_end'>
      <article className='info_container'>
        <h1 className='title_info_container'>Itinerario: Vuelo</h1>
        <div className='subtitle_info_container'>
          {/* <p>Ida</p> */}
          <p>{returnDate ? 'Vuelta' : 'Ida'}</p>
          <span>Duración {departureTime}</span>
        </div>
        <span className='flight_confirmed'>
          {' '}
          <CheckCircleOutlineIcon /> Vuelo confirmado
        </span>
      </article>
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
      <article className='info_container'>
        <h1 className='title_include'> Tu viaje incluye</h1>
        <p>
          <FaCheck /> Gestiona tu viaje desde el móvil: recibe un mensaje en el
          móvil con un enlace a una página web personalizada donde podrás
          consultar el estado de tu viaje
        </p>
        <p>
          <FaCheck /> Alertas sobre tu vuelo en tu teléfono: te mandamos un
          mensaje al móvil informándote de cualquier cambio en tu vuelo
        </p>
        <p>
          <FaCheck /> Atención al Cliente prioritaria: recibe atención al
          cliente prioritaria a través del número de teléfono con tarifa
          reducida .
        </p>
        <p>
          <FaCheck /> Cambios en tu reserva: modificaciones y cancelaciones sin
          ningún coste adicional
        </p>
      </article>
      <article className='info_container'>
        <h1>Información de facturación</h1>
        <p className='bottom_line'>Contacto principal</p>
        <h2> Firulais García</h2>
        <div className='info_main_contact'>
          <span>
            {' '}
            <ImEnvelop />
            {emailContact}
          </span>
          <span>
            <ImPhone /> {phoneContact}
          </span>
          <span>
            <ImHome /> {adressContact}
          </span>
          <span>
            <ImCreditCard /> {creditCardContact}
          </span>
        </div>
        <span className='totalPrice'>Total: {totalPrice}</span>
      </article>
    </section>
  );
};
export default Itinerary;
