import { ImCreditCard, ImEnvelop, ImHome, ImPhone } from 'react-icons/im';

const ContactInfo = ({ infoMainContact, totalPrice, emergencyData }) => {
  return (
    <article className='info_container'>
      <h1>Información de facturación</h1>
      <p className='bottom_line'>Contacto principal</p>
      <h2>{emergencyData.name}</h2>
      <div className='info_main_contact'>
        <span>
          {' '}
          <ImEnvelop className='icon-color ' />
          {emergencyData.email}
        </span>
        <span>
          <ImPhone className='icon-color ' /> {emergencyData.phone}
        </span>
        <span>
          <ImHome className='icon-color ' /> {infoMainContact.address}
        </span>
        <span>
          <ImCreditCard className='icon-color ' /> {infoMainContact.creditCard}
        </span>
      </div>
      <span className='totalPrice'>Total: {totalPrice} €</span>
    </article>
  );
};

export default ContactInfo;
