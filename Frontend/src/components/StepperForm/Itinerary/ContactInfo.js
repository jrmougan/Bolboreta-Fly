import { ImCreditCard, ImEnvelop, ImHome, ImPhone } from 'react-icons/im';

const ContactInfo = ({ infoMainContact, totalPrice }) => {
  return (
    <article className='info_container'>
      <h1>Información de facturación</h1>
      <p className='bottom_line'>Contacto principal</p>
      <h2>{infoMainContact.name}</h2>
      <div className='info_main_contact'>
        <span>
          {' '}
          <ImEnvelop />
          {infoMainContact.email}
        </span>
        <span>
          <ImPhone /> {infoMainContact.phone}
        </span>
        <span>
          <ImHome /> {infoMainContact.address}
        </span>
        <span>
          <ImCreditCard /> {infoMainContact.creditCard}
        </span>
      </div>
      <span className='totalPrice'>Total: {totalPrice}</span>
    </article>
  );
};

export default ContactInfo;
