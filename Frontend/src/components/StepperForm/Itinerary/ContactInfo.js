import { ImCreditCard, ImEnvelop, ImHome, ImPhone } from 'react-icons/im';

// Cambiar a PaymentInfo
const ContactInfo = ({
  infoMainContact,
  totalPrice,
  emergencyData,
  traveler,
}) => {
  const exampleInfo = {
    name: 'Edualdo',
    email: 'edualdo@gmail.com',
    phone: '664 567 544',
    address: 'Sierra del Gialdo',
    price: '500€',
  };
  return (
    <article className='info_container'>
      <h1>Información de Contacto</h1>
      <p className='bottom_line'>Contacto principal</p>
      <h2>{exampleInfo.name}</h2>
      <div className='info_main_contact'>
        <span>
          {' '}
          <ImEnvelop className='icon-color ' />
          {exampleInfo.email}
        </span>
        <span>
          <ImPhone className='icon-color ' /> {exampleInfo.phone}
        </span>
        <span>
          <ImHome className='icon-color ' /> {exampleInfo.address}
        </span>
        {/*         <span>
          <ImCreditCard className='icon-color ' /> {infoMainContact.creditCard}
        </span> */}
      </div>
      <span className='totalPrice'>Total: {exampleInfo.price} €</span>
    </article>
  );
};

export default ContactInfo;
