import { ImCreditCard, ImEnvelop, ImHome, ImPhone } from 'react-icons/im';

// Cambiar a PaymentInfo

const ContactInfo = ({
  infoMainContact,
  totalPrice,
  emergencyData,
  traveler,
  contacts,
}) => {
  const exampleInfo = {
    name: 'Edualdo',
    email: 'edualdo@gmail.com',
    phone: '664 567 544',

    price: '500€',
  };
  let name, email, phone;

  if (contacts?.name?.firstName) {
    name = contacts.name.firstName;
    email = contacts.emailAddress;
    phone =
      traveler.contact.phones.countryCallingCode +
      traveler.contact.phones.number;
  } else {
    name = traveler.name.firstName;
    email = traveler.contact.emailAddress;
    phone =
      traveler.contact.phones.countryCallingCode +
      traveler.contact.phones.number;
  }

  return (
    <article className='info_container'>
      <h1>Información de Contacto</h1>
      <p className='bottom_line'>Contacto principal</p>
      <h2>{name || exampleInfo.name}</h2>
      <div className='info_main_contact'>
        <span>
          {' '}
          <ImEnvelop className='icon-color ' />
          {email || exampleInfo.email}
        </span>
        <span>
          <ImPhone className='icon-color ' /> {phone || exampleInfo.phone}
        </span>
        {/*         <span>
          <ImHome className='icon-color ' /> {exampleInfo.address}
        </span> */}
      </div>
      <span className='totalPrice'>
        Total: {totalPrice || exampleInfo.price} €
      </span>
    </article>
  );
};

export default ContactInfo;
